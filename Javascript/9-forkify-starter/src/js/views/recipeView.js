import  {
    elements
} from './base';

import {
    Fraction
} from 'fractional';

export const highlightLink = id => {

    const resultsArr = Array.from(document.querySelectorAll('.results__link'));

    resultsArr.forEach(current => {
        current.classList.remove('results__link--active');
    })

    document.querySelector(`a[href="#${id}"]`).classList.add('results__link--active');
}

const formatCount = count => {
    if (count) {
        //ex count = 2.5
        //ex count = 0.5
        const newCount = Math.round(count * 10000) / 10000;
        const [int, dec] = newCount.toString().split('.').map(el => parseInt(el, 10));

        if (!dec) return newCount;

        if (int === 0) {
            const fraction = new Fraction(newCount);
            return `${fraction.numerator}/${fraction.denominator}`;
        } else {
            const fraction = new Fraction(newCount - int);
            return `${int} ${fraction.numerator}/${fraction.denominator}`;
        }

    }
    return '?';
}

export const clearRecipe = () => {
    elements.recipeContainer.innerHTML = '';
}

const displayTitle = (recipe) => {

    return `<figure class="recipe__fig">
    <img src="${recipe.image_url}" alt="${recipe.title}" class="recipe__img">
    <h1 class="recipe__title">
        <span>${recipe.title}</span>
    </h1>
</figure>`;

}

const displayDetails = (recipe) => {
    return `<div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-stopwatch"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                    <span class="recipe__info-text"> minutes</span>
                </div>
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                    <span class="recipe__info-text"> servings</span>

                    <div class="recipe__info-buttons">
                        <button class="btn-tiny btn-decrease">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button class="btn-tiny btn-increase">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>
                <button class="recipe__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#icon-heart-outlined"></use>
                    </svg>
                </button>
            </div>`;
}

const displayIngredient = (ingredient) => {

    return `<li class="recipe__item">
    <svg class="recipe__icon">
        <use href="img/icons.svg#icon-check"></use>
    </svg>
    <div class="recipe__count">${formatCount(ingredient.count)}</div>
    <div class="recipe__ingredient">
        <span class="recipe__unit">${ingredient.unit}</span>
        ${ingredient.ingredient}
    </div>
</li>`;
}

const displayIngList = (recipe) => {
    let Html = `<div class="recipe__ingredients">
                <ul class="recipe__ingredient-list">`;

    recipe.ingredients.forEach(e => {
        Html += displayIngredient(e)
    });

    Html += `</ul>
    <button class="btn-small recipe__btn recipe__btn--cart">
        <svg class="search__icon">
            <use href="img/icons.svg#icon-shopping-cart"></use>
        </svg>
        <span>Add to shopping list</span>
    </button>
    </div>`;
    return Html;
}

const displayDirections = (recipe) => {
    return `<div class="recipe__directions">
    <h2 class="heading-2">How to cook it</h2>
    <p class="recipe__directions-text">
        This recipe was carefully designed and tested by
        <span class="recipe__by">${recipe.publisher}</span>. Please check out directions at their website.
    </p>
    <a class="btn-small recipe__btn" href="${recipe.source_url}" target="_blank">
        <span>Directions</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-right"></use>
        </svg>

    </a>
</div>`;
}

export const displayRecipe = (recipe, isLiked) => {
    elements.recipeContainer.insertAdjacentHTML('afterbegin', displayTitle(recipe));
    elements.recipeContainer.insertAdjacentHTML('beforeend', displayDetails(recipe));
    elements.recipeContainer.insertAdjacentHTML('beforeend', displayIngList(recipe));
    elements.recipeContainer.insertAdjacentHTML('beforeend', displayDirections(recipe));
    toggleLike(isLiked)
}

export const updateServingsIngredients = (recipe) => {
    //update servings
    document.querySelector('.recipe__info-data--people').textContent = recipe.servings;
    //update ingredients
    const countElements = Array.from(document.querySelectorAll('.recipe__count'));
    countElements.forEach((e, index) => {
        e.textContent = formatCount(recipe.ingredients[index].count);
    });

}

export const toggleLike = isLiked => {
    const iconString = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconString}`);
}