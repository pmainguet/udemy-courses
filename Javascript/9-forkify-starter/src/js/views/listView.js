import  {
    elements
} from './base';

const displayItemList = (item) => {

    return `<li class="shopping__item" data-id="${item.id}">
        <div class="shopping__count">
            <input type="number" value="${item.count}" step="${item.count}">
            <p>${item.unit}</p>
        </div>
        <p class="shopping__description">${item.ingredient}</p>
        <button class="shopping__delete btn-tiny">
            <svg>
                <use href="img/icons.svg#icon-circle-with-cross"></use>
            </svg>
        </button>
    </li>`;
}

export const displayList = (list) => {
    list.items.forEach(e => {
        elements.listContainer.insertAdjacentHTML('beforeend', displayItemList(e));
    });
}

export const updateList = (idToDelete) => {
    // const items = Array.from(elements.listContainer.querySelectorAll('.shopping__item'));
    // items.forEach(e => {
    //     if (e.dataset.id === idToDelete) {
    //         e.outerHTML = '';
    //     }
    // })

    const item = document.querySelector(`[data-id="${idToDelete}"]`);
    item.parentElement.removeChild(item);
}