import  {
    elements
} from './base';

import {
    limitRecipeTitle
} from './searchView'

export const renderLike = (like) => {
    const html = `<li>
    <a class="likes__link" href="#${like.id}">
        <figure class="likes__fig">
            <img src="${like.img}" alt="Test">
        </figure>
        <div class="likes__data">
            <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
            <p class="likes__author">${like.author}</p>
        </div>
    </a>
</li>`;

    elements.likeContainer.insertAdjacentHTML('beforeend', html);
}

export const removeLike = (id) => {
    elements.likeContainer.querySelector(`.likes__link[href = "#${id}"]`).parentElement.outerHTML = '';
}