//Updating object without mutating data

const meal = {
    id: 2,
    description: 'Breakfast'
};

//1st option: use a new constant => too verbose

const updatedMeal = {
    id: meal.id,
    description: meal.description,
    calories: 600
}

//2nd option: use the spread operator

//add property
const updatedMeal2 = {
    ...meal,
    calories: 600

}

//update property
const updatedMeal3 = {
    ...meal,
    description: 'truc'

}

//delete property using Desctructuring
const {
    id,
    ...mealWithoutId
} = updatedMeal