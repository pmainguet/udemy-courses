import  {
    elements
} from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.resultsList.innerHTML = '';
}

export const limitRecipeTitle = (title, limit = 17) => {
    const newTitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                newTitle.push(cur);
            }
            return acc + cur.length;
        }, 0);
        title = `${newTitle.join(' ')} ...`;
    }

    return title;
}

const displaySingleResult = e => {
    const href = e.recipe_id;
    const img = e.image_url;
    const img_alt = e.title;
    const name = limitRecipeTitle(e.title);
    const author = e.publisher;

    const html = `<li>
    <a class="results__link" href="#${href}">
        <figure class="results__fig">
            <img src="${img}" alt="${img_alt}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${name}</h4>
            <p class="results__author">${author}</p>
        </div>
    </a>
    </li>`;

    elements.resultsList.insertAdjacentHTML('beforeend', html);

};

const renderButton = (page, type) => {
    const buttonHTML = `<button class="btn-inline results__btn--${type}" data-goto=${ (type === 'prev') ? page-1 : page + 1}>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${ (type === 'prev') ? 'left' : 'right'}"></use>
        </svg>
        <span>Page ${ (type === 'prev') ? page-1 : page + 1}</span>
    </button>`;

    elements.resultsPages.insertAdjacentHTML('afterbegin', buttonHTML);
}

const renderButtons = (page, totalPage) => {

    if (page > 1) {
        renderButton(parseInt(page), 'prev');
    }
    if (page < totalPage) {
        renderButton(parseInt(page), 'next');
    }
}

const clearButtons = () => {
    elements.resultsPages.innerHTML = '';
}

export const displayResults = (results, page = 1, resPerPage = 10) => {

    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    const totalPage = Math.ceil(results.length / resPerPage);

    clearButtons();
    results.slice(start, end).forEach(e => displaySingleResult(e));
    renderButtons(page, totalPage);

};