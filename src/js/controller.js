// import icons from 'url:../img/icons.svg';
import recipeView from './views/recipeView';
import * as model from './models';
const recipeContainer = document.querySelector('.recipe');
import { MODAL_CLOSE_SEC } from './config';
import searchView from './views/searchView';
import resultsView from './views/resultsView';
import paginationView from './views/paginationView';
import bookmarksView from './views/bookmarksView';
import addRecipeView from './views/addRecipeView';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () { 
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

async function controlRecipes() {
  try{
    //renderSpinner(recipeContainer);
    const id = window.location.hash.slice(1);
    //console.log(id);
    if(!id){
      return;
    }
    recipeView.renderSpinner();
    // const resp = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}`);  
    // const data = await resp.json();   
    //await model.loadRecipe(id); 
    resultsView.update(model.getSearchResulstPage());
    bookmarksView.update(model.state.bookmarks);
    // const recipe = model.state;
    // let recipe = data.data.recipe;
    // recipe = {
    //             id: recipe.id,
    //             title: recipe.title,
    //             publisher: recipe.publisher,
    //             sourceUrl: recipe.source_url,
    //             image: recipe.image_url,
    //             servings: recipe.servings,
    //             cookTime: recipe.cooking_time,
    //             ingredients: recipe.ingredients,
    //             }; 
    await model.loadRecipe(id);
    // recipeContainer.innerHTML = '';
    // recipeContainer.insertAdjacentHTML('afterbegin', markup);
    recipeView.render(model.state.recipe);
  }
  catch(err){
    console.error(err);
    alert(err);
  }  
}

async function controlSearchResults() {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuary();
    if (!query) return;
    await model.loadSearchResults(query);
    resultsView.render(model.getSearchResulstPage());
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
}

function controlAddBookmark(){
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deletBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
  bookmarksView.render(model.state.bookmarks);
}


async function controlAddRecipe(newRecipe) {
  try {
    addRecipeView.renderSpinner();
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);
    recipeView.render(model.state.recipe);
    addRecipeView.renderMessage();
    bookmarksView.render(model.state.bookmarks);
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    setTimeout(() => {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error('💥', err);
    addRecipeView.renderError(err.message);
  }
}

function controlPagination(pageGoTo) {
  resultsView.render(model.getSearchResulstPage(pageGoTo));
  paginationView.render(model.state.search);
}

const controlServings = function (newServings) {
  model.updateServings(newServings);
  recipeView.update(model.state.recipe);
}
// function renderSpinner(parentEl){
//   let markup = `<div class="spinner">
//           <svg>
//             <use href="src/img/icons.svg#icon-loader"></use>
//           </svg>
//         </div> `;
//   parentEl.innerHTML = '';
//   parentEl.insertAdjacentHTML('afterbegin', markup);
// }
const controlBookmarks = function(){
    bookmarksView.render(model.state.bookmarks);
}
//Event listener
// document.addEventListener('DOMContentLoaded', function(){
//     //console.log('App lista para interacción.')
//     //showRecipe();
    
//     recipeView.addHandler(controlRecipes);
//     recipeView.addHandlerUpdateServings(controlServings);
//     recipeView.addHandlerAddBookmark(controlAddBookmark);
//     bookmarksView.addHandlerRender(controlBookmarks);
//     searchView.addHandlerSearch(controlSearchResults);
//     paginationView.addHandlerClick(controlPagination);
//     addRecipeView.addHandlerUPload(controlAddRecipe);
// });

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandler(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  addRecipeView.addHandlerUPload(controlAddRecipe);
};
init();

//const arr = ['hashchange', 'load'].forEach((ev)=>{
  // console.log(ev);
  //document.addEventListener(ev, showRecipe());
//});