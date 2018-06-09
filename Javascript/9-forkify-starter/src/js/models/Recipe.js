import axios from 'axios';

import {
    configApp
} from '../config'

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async getContent() {
        const getUrl = `${configApp.proxy+configApp.urlApi}/get?key=${configApp.apiKey}&rId=${this.id}`;

        try {
            const res = await axios(getUrl);
            const content = res.data.recipe;
            this.image_url = content.image_url;
            this.ingredients = content.ingredients;
            this.publisher = content.publisher;
            this.publisher_url = content.publisher_url;
            this.social_rank = content.social_rank;
            this.source_url = content.source_url;
            this.title = content.title;

            this.calcTime();
            this.calcServings();
            this.parseIngredients();

        } catch (error) {
            alert("Something went wrong :(  ... " + error);
        }

    }

    calcTime() {
        //Assuming it takes 15 minutes per 3 ingredients
        const numIng = this.ingredients.length;
        const periods = Math.ceil(numIng / 3);
        this.time = periods * 15;
    }

    calcServings() {
        this.servings = 4;
    }

    parseIngredients() {

        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', "teaspoons", "teaspoon", "cups", "pounds"];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', "cup", "pound"];
        const units = [...unitsLong, "kg", "g"]

        const newIngredients = this.ingredients.map(ing => {

            let ingredient = ing.toLowerCase();
            //Uniform units
            unitsLong.forEach((unit, index) => {
                if (ingredient.includes(unit)) {
                    ingredient = ingredient.replace(unit, unitsShort[index]);
                }
            });

            //Remove parenthesis
            ingredient = ingredient.replace("(", "").replace(")", " ").replace("  ", " ");

            //Parse ingredients into count, unit and ingredient
            const arrIng = ingredient.split(" ");
            const unitIndex = arrIng.findIndex(el2 => unitsShort.includes(el2));

            let objIng;
            if (unitIndex > -1) {
                //There is a unit
                // Ex 4 1/2 cup becomes [4, 1/2]
                // Ex 4 cup become [4]
                const arrCount = arrIng.slice(0, unitIndex)

                let count;
                if (arrCount.length === 1) {
                    count = eval(arrIng[0])
                } else {
                    count = eval(arrIng.slice(0, unitIndex).join("+"));
                }

                objIng = {
                    count,
                    unit: arrIng[unitIndex],
                    ingredient: arrIng.splice(unitIndex + 1).join(" ")
                }

            } else if (parseInt(arrIng[0], 10)) {
                //There is no unit, but the first element is a number
                objIng = {
                    count: parseInt(arrIng[0], 10),
                    unit: '',
                    ingredient: arrIng.splice(0, 1).join(" ")
                }
            } else if (unitIndex === -1) {
                //There is no unit
                objIng = {
                    count: 1,
                    unit: '',
                    ingredient
                }
            }

            ingredient = objIng;

            return ingredient


        })

        this.ingredients = newIngredients;
    }

    updateServings(type) {
        //Servings
        const newServings = (type === 'dec') ? this.servings - 1 : this.servings + 1;

        const mult = newServings / this.servings;
        //Ingredients
        this.ingredients.forEach(e => {
            e.count *= mult;
        });

        this.servings = newServings;
    }

}