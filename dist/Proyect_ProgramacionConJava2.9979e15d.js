let e;function t(e){return e&&e.__esModule?e.default:e}var r={};r=import.meta.resolve("eyyUD");class a{_data;render(e,t=!0){if(!e||Array.isArray(e)&&0===e.length)return this.renderError();this._data=e;let r=this._generateMarkup();if(!t)return r;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",r)}update(e,t=!0){this._data=e;let r=this._generateMarkup();if(!t)return markup;let a=Array.from(document.createRange().createContextualFragment(r).querySelectorAll("*")),s=Array.from(this._parentElement.querySelectorAll("*"));a.forEach((e,t)=>{let r=s[t];e.isEqualNode(r)||e.firstChild?.nodeValue.trim()===""||(r.textContent=e.textContent),e.isEqualNode(r)||Array.from(e.attributes).forEach(e=>r.setAttribute(e.name,e.value))})}_clear(){this._parentElement.innerHTML=""}renderSpinner(){let e=`
        <div class="spinner">
           <svg>
              <use href="${t(r)}#icon-loader"></use>
           </svg>
         </div>
    `;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",e)}renderError(e=this._errorMessage){let a=`
          <div class="error">
            <div>
              <svg>
                <use href="${t(r)}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${e}</p>
          </div>`;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",a)}renderMessage(e=this._message){let a=`
          <div class="message">
            <div>
              <svg>
                <use href="${t(r)}#icon-smile"></use>
              </svg>
            </div>
            <p>${e}</p>
          </div>`;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",a)}}class s extends a{_parentElement=document.querySelector(".recipe");_errorMessage=" No recipes found for your query. Please try again!";_message="";addHandler(e){["hashchange","load"].forEach(t=>window.addEventListener(t,e))}addHandlerUpdateServings(e){this._parentElement.addEventListener("click",function(t){let r=t.target.closest(".btn--tiny");if(!r)return;let{updateTo:a}=r.dataset;+a>0&&e(+a)})}addHandlerAddBookmark(e){this._parentElement.addEventListener("click",function(t){t.target.closest(".btn--bookmark")&&e()})}_generateMarkup(){return`
        <figure class="recipe__fig">
              <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
              <h1 class="recipe__title">
                <span>${this._data.title}</span>
              </h1>
            </figure>

            <div class="recipe__details">
              <div class="recipe__info">
                <svg class="recipe__info-icon">
                  <use href="${t(r)}#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
                <span class="recipe__info-text">minutes</span>
              </div>
              <div class="recipe__info">
                <svg class="recipe__info-icon">
                  <use href="${t(r)}#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
                <span class="recipe__info-text">servings</span>

                <div class="recipe__info-buttons">
                  <button class="btn--tiny btn--update-servings" data-update-to="${this._data.servings-1}">
                    <svg>
                      <use href="${t(r)}#icon-minus-circle"></use>
                    </svg>
                  </button>
                  <button class="btn--tiny btn--update-servings" data-update-to="${this._data.servings+1}">
                    <svg>
                      <use href="${t(r)}#icon-plus-circle"></use>
                    </svg>
                  </button>
                </div>
              </div>

              <div class="recipe__user-generated ${this._data.key?"":"hidden"}">
                <svg>
                  <use href="${t(r)}#icon-user"></use>
                </svg>
              </div>
              <button class="btn--round btn--bookmark">
                <svg class="">
                  <use href="${t(r)}#icon-bookmark${this._data.bookmarked?"-fill":""}"></use>
                </svg>
              </button>
            </div>

            <div class="recipe__ingredients">
              <h2 class="heading--2">Recipe ingredients</h2>
              <ul class="recipe__ingredient-list">
                ${this._data.ingredints.map(this._generateMarkupIngredient).join("")}

            </div>

            <div class="recipe__directions">
              <h2 class="heading--2">How to cook it</h2>
              <p class="recipe__directions-text">
                This recipe was carefully designed and tested by
                <span class="recipe__publisher">${this._data.publisher}</span>. Please check out
                directions at their website.
              </p>
              <a
                class="btn--small recipe__btn"
                href="${this._data.sorceUrl}"
                target="_blank"
              >
                <span>Directions</span>
                <svg class="search__icon">
                  <use href="${t(r)}#icon-arrow-right"></use>
                </svg>
              </a>
            </div>
    `}_generateMarkupIngredient(e){return`
    <li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href="${t(r)}#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${e.quantity?function(e){var t;let r,a,s=e.toString();if(-1===s.indexOf("."))return`${e}`;let i=Math.pow(10,s.length-s.indexOf(".")-1),[n,o]=(t=e*i,a=(r=(e,t)=>0===t?e:r(t,e%t))(t,i),[t/a,i/a]);return`${n}/${o}`}(e.quantity):""}</div>
    <div class="recipe__description">
      <span class="recipe__unit">${e.unit}</span>
  ${e.description}
    </div>
  </li>
    `}}var i=new s;let n="https://forkify-api.herokuapp.com/api/v2/recipes",o=async function(e,t){try{let r=t?await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}):fetch(e),a=await Promise.race([r,new Promise(function(e,t){setTimeout(function(){t(Error("Request took too long! Timeout after 20 second"))},2e4)})]),s=await a.json();if(!a.ok)throw Error(`${s.message} (${a.status})`);return s}catch(e){throw e}},c={recipe:{},search:{query:"",results:[],page:1,resultsPerPage:10},bookmarks:[]},d=async function(e){try{let t=await o(`${n}/${e}`);c.recipe=l(t),c.bookmarks.some(t=>t.id===e)?c.recipe.bookmarked=!0:c.recipe.bookmarked=!1}catch(e){throw console.error(`${e}`),e}},l=function(e){let{recipe:t}=e.data;return{id:t.id,title:t.title,publisher:t.publisher,sorceUrl:t.source_url,image:t.image_url,servings:t.servings,cookingTime:t.cooking_time,ingredints:t.ingredients,...t.key&&{key:t.key}}},u=async function(e){try{c.search.query=e;let t=await o(`${n}?search=${e}`);c.search.results=t.data.recipes.map(e=>({id:e.id,title:e.title,publisher:e.publisher,image:e.image_url,...e.key&&{key:e.key}})),c.search.page=1}catch(e){throw console.error(`${e}`),e}},p=function(e=c.search.page){c.search.page=e;let t=(e-1)*c.search.resultsPerPage,r=e*c.search.resultsPerPage;return c.search.results.slice(t,r)},_=function(e){c.recipe.ingredints.forEach(t=>{t.quantity=t.quantity*e/c.recipe.servings}),c.recipe.servings=e},g=function(){localStorage.setItem("bookmarks",JSON.stringify(c.bookmarks))},h=function(e){c.bookmarks.push(e),e.id===c.recipe.id&&(c.recipe.bookmarked=!0),g()},m=function(e){let t=c.bookmarks.findIndex(t=>t.id===e);c.bookmarks.splice(t,1),e===c.recipe.id&&(c.recipe.bookmarked=!1),g()};(e=localStorage.getItem("bookmarks"))&&(c.bookmarks=JSON.parse(e));let v=async function(e){try{let t=Object.entries(e).filter(e=>e[0].startsWith("ingredient")&&""!==e[1]).map(e=>{let t=e[1].split(",").map(e=>e.trim());if(3!==t.length)throw Error("wrong ingredient format! please use the currect format :)");let[r,a,s]=t;return{quantity:r?+r:null,unit:a,description:s}}),r={title:e.title,source_url:e.sourceUrl,image_url:e.image,publisher:e.publisher,cooking_time:+e.cookingTime,servings:+e.servings,ingredients:t},a=await o(`${n}?key=b2773b78-484b-471c-95d0-f62282d51797`,r);c.recipe=l(a),h(c.recipe)}catch(e){throw e}};class f{_parentElement=document.querySelector(".search");getQuary(){let e=this._parentElement.querySelector(".search__field").value;return this.clearInput(),e}clearInput(){this._parentElement.querySelector(".search__field").value=""}addHandlerSearch(e){this._parentElement.addEventListener("submit",function(t){t.preventDefault(),e()})}}var k=new f,b=new class extends a{_parentElement="";_generateMarkup(){let e=window.location.hash.slice(1);return`
          <li class="preview">
            <a class="preview__link ${this._data.id===e?"preview__link--active":""}" href="#${this._data.id}">
              <figure class="preview__fig">
                <img src="${this._data.image}" alt="${this._data.title}" />
              </figure>
              <div class="preview__data">
                <h4 class="preview__title">${this._data.title}</h4>
                <p class="preview__publisher">${this._data.publisher}</p>
                <div class="recipe__user-generated ${this._data.key?"":"hidden"}">
                  <svg>
                    <use href="${t(r)}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>`}};class y extends a{_parentElement=document.querySelector(".results");_errorMessage=" No recipes found for your query. Please try again ;)";_message="";_generateMarkup(){return this._data.map(e=>b.render(e,!1)).join("")}}var w=new y;class $ extends a{_parentElement=document.querySelector(".pagination");addHandlerClick(e){this._parentElement.addEventListener("click",function(t){let r=t.target.closest(".btn--inline");r&&e(+r.dataset.goto)})}_generateMarkup(){let e=this._data.page,a=Math.ceil(this._data.results.length/this._data.resultsPerPage);return 1===e&&a>1?`
          <button data-goto="${e+1}" class="btn--inline pagination__btn--next">
            <span>Page ${e+1}</span>
            <svg class="search__icon">
              <use href="${t(r)}#icon-arrow-right"></use>
            </svg>
          </button>`:e===a&&a>1?`
         <button data-goto="${e-1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${t(r)}#icon-arrow-left"></use>
            </svg>
            <span>Page ${e-1}</span>
          </button>
          `:e<a?`
       <button data-goto="${e-1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${t(r)}#icon-arrow-left"></use>
            </svg>
            <span>Page ${e-1}</span>
          </button>
           <button data-goto="${e+1}" class="btn--inline pagination__btn--next">
            <span>Page ${e+1}</span>
            <svg class="search__icon">
              <use href="${t(r)}#icon-arrow-right"></use>
            </svg>
          </button>`:"Only one page"}}var E=new $;class S extends a{_parentElement=document.querySelector(".bookmarks__list");_errorMessage=" No bookmarks yet. Find a nice recipe and bookmark it :)";_message="";addHandlerRender(e){window.addEventListener("load",e)}_generateMarkup(){return this._data.map(e=>b.render(e,!1)).join("")}}var q=new S;class H extends a{_parentElement=document.querySelector(".upload");_message="Recipe was successfully uploaded :)";_window=document.querySelector(".add-recipe-window");_overlay=document.querySelector(".overlay");_btnOpen=document.querySelector(".nav__btn--add-recipe");_btnClose=document.querySelector(".btn--close-modal");constructor(){super(),this._addHandlerShowWindow(),this._addHandlerHideWindow()}toggleWindow(){this._overlay.classList.toggle("hidden"),this._window.classList.toggle("hidden")}_addHandlerShowWindow(){this._btnOpen.addEventListener("click",this.toggleWindow.bind(this))}_addHandlerHideWindow(){this._btnClose.addEventListener("click",this.toggleWindow.bind(this)),this._overlay.addEventListener("click",this.toggleWindow.bind(this))}addHandlerUPload(e){this._parentElement.addEventListener("submit",function(t){t.preventDefault(),e(Object.fromEntries([...new FormData(this)]))})}_generateMarkup(){}}var M=new H;async function P(){try{let e=window.location.hash.slice(1);if(!e)return;i.renderSpinner(),w.update(p()),q.update(c.bookmarks),await d(e),i.render(c.recipe)}catch(e){console.error(e),alert(e)}}async function x(){try{w.renderSpinner();let e=k.getQuary();if(!e)return;await u(e),w.render(p()),E.render(c.search)}catch(e){console.error(e)}}async function L(e){try{M.renderSpinner(),await v(e),console.log(c.recipe),i.render(c.recipe),M.renderMessage(),q.render(c.bookmarks),window.history.pushState(null,"",`#${c.recipe.id}`),setTimeout(()=>{M.toggleWindow()},5e3)}catch(e){console.error("💥",e),M.renderError(e.message)}}document.querySelector(".recipe");q.addHandlerRender(function(){q.render(c.bookmarks)}),i.addHandler(P),i.addHandlerUpdateServings(function(e){_(e),i.update(c.recipe)}),i.addHandlerAddBookmark(function(){c.recipe.bookmarked?m(c.recipe.id):h(c.recipe),i.update(c.recipe),q.render(c.bookmarks)}),k.addHandlerSearch(x),E.addHandlerClick(function(e){w.render(p(e)),E.render(c.search)}),M.addHandlerUPload(L);
//# sourceMappingURL=Proyect_ProgramacionConJava2.9979e15d.js.map
