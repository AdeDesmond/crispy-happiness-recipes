import * as model from './model';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import searchResultsView from './views/searchresultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
if (module.hot) {
  module.hot.accept();
}
const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderaSpinner(recipeContainer);

    // 0 Update results view to mark selected result
    searchResultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    //1) loading recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;

    //2) rendering recipe
    recipeView.render(model.state.recipe);
  } catch (error) {
    recipeView.renderError(`${error.message}`);
  }
};

const controlSearchResults = async function () {
  try {
    searchResultsView.renderaSpinner();
    //1) get search query
    const query = searchView.getQuery();
    if (!query) return;
    //2) load search results
    await model.loadSearchResults(query);
    //2) render resultsz
    searchResultsView.render(model.getSearchResultsPage());
    // 4 render the initial pagination button
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
    searchResultsView.renderError(err.message);
  }
};

const controlPagination = function (goToPage) {
  //--> render new results
  searchResultsView.render(model.getSearchResultsPage(goToPage));
  //--> render new pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //Update ther recipe servings
  model.updateServings(newServings);
  //update the recipe view
  //recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  // 2) Update the
  recipeView.update(model.state.recipe);
  // 3) render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookMarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

//running different events or listening to different events
const init = function () {
  bookmarksView.addhandlerBookmarks(controlBookMarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateRecipeServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addhandlerSearch(controlSearchResults);
  paginationView.addhandlerClick(controlPagination);
};
init();
//hash in case points to the id
