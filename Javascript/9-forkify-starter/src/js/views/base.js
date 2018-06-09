export const elements = {
    searchForm: document.querySelector('.search'),
    searchInput: document.querySelector('.search__field'),
    resultsList: document.querySelector('.results__list'),
    resultsParent: document.querySelector('.results'),
    resultsPages: document.querySelector('.results__pages'),
    recipeContainer: document.querySelector('.recipe'),
    listContainer: document.querySelector('.shopping__list'),
    likeContainer: document.querySelector('.likes__list')
};

export const elementStrings = {
    loader: 'loader'
}

//for Search and Recipe and other modulese

export const renderLoader = (parent) => {
    const loader = `<div class="${elementStrings.loader}">
        <svg>
        <use href = "img/icons.svg#icon-cw"></use>
        </svg>
        </div>
    `;

    parent.insertAdjacentHTML('afterbegin', loader);
}

export const removeLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader) loader.parentElement.removeChild(loader)
}