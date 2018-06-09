import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/List';
import Like from './models/Like';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likeView from './views/likeView';
import {
    elements,
    renderLoader,
    removeLoader
} from './views/base';

/* Global state of the app
 * search object
 * current recipe object
 * shopping list object
 * Liked recipes
 */

const state = {};

//search Result

const controlSearch = async () => {

    //Get the query from the view

    const query = searchView.getInput();

    if (query) {
        //new search object and add it to state
        state.search = new Search(query);

        //Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.resultsParent);

        try {
            // Search for recipes
            await state.search.getResults();

            // render results on UI
            removeLoader();
            searchView.displayResults(state.search.result);
        } catch (err) {
            alert("Error processing recipes list !");
            removeLoader();
        }
    }
}

const updateResultLists = (page) => {
    searchView.clearResults();
    searchView.displayResults(state.search.result, page);
}

//Recipe

const controlRecipe = async () => {

    const id = window.location.hash.replace('#', '');

    if (id) {
        //new Recipe Object and add it to state
        state.currentRecipe = new Recipe(id);

        //Prepare UI for recipe
        recipeView.clearRecipe();
        renderLoader(elements.recipeContainer);
        if (state.search) recipeView.highlightLink(id);

        try {
            //Get Recipe from API
            await state.currentRecipe.getContent();
            // //render Recipe on UI
            removeLoader();
            const isLiked = (!state.like) ? false : state.like.isLiked(id);
            recipeView.displayRecipe(state.currentRecipe, isLiked);
        } catch (err) {
            alert("Error processing recipe ! ");
            console.log(err)
            removeLoader();
        }

    }

}

//List

const controlList = () => {

    if (!state.list) state.list = new List();

    //update List Model
    state.currentRecipe.ingredients.forEach(e => {
        state.list.addItem(e.count, e.unit, e.ingredient);
    });

    //display List
    listView.displayList(state.list);

}

const controlLike = () => {

    if (!state.like) state.like = new Like();

    if (!state.like.isLiked(state.currentRecipe.id)) {
        const like = state.like.addLike(state.currentRecipe.id, state.currentRecipe.title, state.currentRecipe.publisher, state.currentRecipe.image_url);
        recipeView.toggleLike(true);
        likeView.renderLike(like)
    } else {
        state.like.deleteLike(state.currentRecipe.id);
        recipeView.toggleLike(false);
        likeView.removeLike(state.currentRecipe.id)
    }
}

//Event listeners

elements.searchForm.addEventListener('submit', e => {
    e.preventDefault();
    controlSearch();
});

elements.resultsPages.addEventListener('click', e => {
    const btn = e.target.closest('.btn-inline');
    if (btn) {
        const goToPage = btn.dataset.goto;
        updateResultLists(goToPage);
        recipeView.highlightLink(btn);
    }
});

['hashchange', 'load'].forEach(e => {
    window.addEventListener(e, controlRecipe);

    //populate with localStorage data if exist
    if (!state.like) state.like = new Like();
    state.like.readStorage();
    state.like.likes.forEach(e => {
        likeView.renderLike(e)
    })

});

//event listener for update servings
elements.recipeContainer.addEventListener('click', e => {
    //const btn = e.target.closest('.btn-tiny');
    if (e.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.currentRecipe.servings > 1) {
            state.currentRecipe.updateServings('dec');
            recipeView.updateServingsIngredients(state.currentRecipe);
        }
    } else if (e.target.matches('.btn-increase, .btn-increase *')) {
        state.currentRecipe.updateServings('inc');
        recipeView.updateServingsIngredients(state.currentRecipe);
    } else if (e.target.matches('.recipe__love--cart, .recipe__btn--cart *')) {
        controlList();
    } else if (e.target.matches('.recipe__love, .recipe__love *')) {
        controlLike();
    }
});

//event listener to delete item from list and update count
elements.listContainer.addEventListener('click', e => {
    const id = e.target.closest('.shopping__item').dataset.id;
    if (e.target.matches('.shopping__delete, .shopping__delete *')) {
        state.list.deleteItem(id);
        listView.updateList(id);
    } else if (e.target.matches('.shopping__count input[type="number"]')) {
        const newCount = parseFloat(e.target.value);
        state.list.updateCount(id, newCount);
    }
});