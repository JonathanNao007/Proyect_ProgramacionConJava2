let e;var t={};let r=new URL(t=import.meta.resolve("hfd23")).href;class a{_data;render(e,t=!0){if(!e||Array.isArray(e)&&0===e.length)return this.renderError();this._data=e;let r=this._generateMarkup();if(!t)return r;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",r)}update(e,t=!0){this._data=e;let r=this._generateMarkup();if(!t)return markup;let a=Array.from(document.createRange().createContextualFragment(r).querySelectorAll("*")),s=Array.from(this._parentElement.querySelectorAll("*"));a.forEach((e,t)=>{let r=s[t];e.isEqualNode(r)||e.firstChild?.nodeValue.trim()===""||(r.textContent=e.textContent),e.isEqualNode(r)||Array.from(e.attributes).forEach(e=>r.setAttribute(e.name,e.value))})}_clear(){this._parentElement.innerHTML=""}renderSpinner(){let e=`
        <div class="spinner">
           <svg>
              <use href="${r}#icon-loader"></use>
           </svg>
         </div>
    `;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",e)}renderError(e=this._errorMessage){let t=`
          <div class="error">
            <div>
              <svg>
                <use href="${r}#icon-alert-triangle"></use>
              </svg>
            </div>
            <p>${e}</p>
          </div>`;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",t)}renderMessage(e=this._message){let t=`
          <div class="message">
            <div>
              <svg>
                <use href="${r}#icon-smile"></use>
              </svg>
            </div>
            <p>${e}</p>
          </div>`;this._clear(),this._parentElement.insertAdjacentHTML("afterbegin",t)}}let s=new URL(t).href;class i extends a{_parentElement=document.querySelector(".recipe");_errorMessage=" No recipes found for your query. Please try again!";_message="";addHandler(e){["hashchange","load"].forEach(t=>window.addEventListener(t,e))}addHandlerUpdateServings(e){this._parentElement.addEventListener("click",function(t){let r=t.target.closest(".btn--tiny");if(!r)return;let{updateTo:a}=r.dataset;+a>0&&e(+a)})}addHandlerAddBookmark(e){this._parentElement.addEventListener("click",function(t){t.target.closest(".btn--bookmark")&&e()})}_generateMarkup(){return`
        <figure class="recipe__fig">
              <img src="${this._data.image}" alt="${this._data.title}" class="recipe__img" />
              <h1 class="recipe__title">
                <span>${this._data.title}</span>
              </h1>
            </figure>

            <div class="recipe__details">
              <div class="recipe__info">
                <svg class="recipe__info-icon">
                  <use href="${s}#icon-clock"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--minutes">${this._data.cookingTime}</span>
                <span class="recipe__info-text">minutes</span>
              </div>
              <div class="recipe__info">
                <svg class="recipe__info-icon">
                  <use href="${s}#icon-users"></use>
                </svg>
                <span class="recipe__info-data recipe__info-data--people">${this._data.servings}</span>
                <span class="recipe__info-text">servings</span>

                <div class="recipe__info-buttons">
                  <button class="btn--tiny btn--update-servings" data-update-to="${this._data.servings-1}">
                    <svg>
                      <use href="${s}#icon-minus-circle"></use>
                    </svg>
                  </button>
                  <button class="btn--tiny btn--update-servings" data-update-to="${this._data.servings+1}">
                    <svg>
                      <use href="${s}#icon-plus-circle"></use>
                    </svg>
                  </button>
                </div>
              </div>

              <div class="recipe__user-generated ${this._data.key?"":"hidden"}">
                <svg>
                  <use href="${s}#icon-user"></use>
                </svg>
              </div>
              <button class="btn--round btn--bookmark">
                <svg class="">
                  <use href="${s}#icon-bookmark${this._data.bookmarked?"-fill":""}"></use>
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
                  <use href="${s}#icon-arrow-right"></use>
                </svg>
              </a>
            </div>
    `}_generateMarkupIngredient(e){return`
    <li class="recipe__ingredient">
    <svg class="recipe__icon">
      <use href="${s}#icon-check"></use>
    </svg>
    <div class="recipe__quantity">${e.quantity?function(e){var t;let r,a,s=e.toString();if(-1===s.indexOf("."))return`${e}`;let i=Math.pow(10,s.length-s.indexOf(".")-1),[n,o]=(t=e*i,a=(r=(e,t)=>0===t?e:r(t,e%t))(t,i),[t/a,i/a]);return`${n}/${o}`}(e.quantity):""}</div>
    <div class="recipe__description">
      <span class="recipe__unit">${e.unit}</span>
  ${e.description}
    </div>
  </li>
    `}}var n=new i;let o="https://forkify-api.herokuapp.com/api/v2/recipes",c=async function(e,t){try{let r=t?await fetch(e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}):fetch(e),a=await Promise.race([r,new Promise(function(e,t){setTimeout(function(){t(Error("Request took too long! Timeout after 20 second"))},2e4)})]),s=await a.json();if(!a.ok)throw Error(`${s.message} (${a.status})`);return s}catch(e){throw e}},d={recipe:{},search:{query:"",results:[],page:1,resultsPerPage:10},bookmarks:[]},l=async function(e){try{let t=await c(`${o}/${e}`);d.recipe=u(t),d.bookmarks.some(t=>t.id===e)?d.recipe.bookmarked=!0:d.recipe.bookmarked=!1}catch(e){throw console.error(`${e}`),e}},u=function(e){let{recipe:t}=e.data;return{id:t.id,title:t.title,publisher:t.publisher,sorceUrl:t.source_url,image:t.image_url,servings:t.servings,cookingTime:t.cooking_time,ingredints:t.ingredients,...t.key&&{key:t.key}}},p=async function(e){try{d.search.query=e;let t=await c(`${o}?search=${e}`);d.search.results=t.data.recipes.map(e=>({id:e.id,title:e.title,publisher:e.publisher,image:e.image_url,...e.key&&{key:e.key}})),d.search.page=1}catch(e){throw console.error(`${e}`),e}},_=function(e=d.search.page){d.search.page=e;let t=(e-1)*d.search.resultsPerPage,r=e*d.search.resultsPerPage;return d.search.results.slice(t,r)},h=function(e){d.recipe.ingredints.forEach(t=>{t.quantity=t.quantity*e/d.recipe.servings}),d.recipe.servings=e},g=function(){localStorage.setItem("bookmarks",JSON.stringify(d.bookmarks))},m=function(e){d.bookmarks.push(e),e.id===d.recipe.id&&(d.recipe.bookmarked=!0),g()},v=function(e){let t=d.bookmarks.findIndex(t=>t.id===e);d.bookmarks.splice(t,1),e===d.recipe.id&&(d.recipe.bookmarked=!1),g()};(e=localStorage.getItem("bookmarks"))&&(d.bookmarks=JSON.parse(e));let f=async function(e){try{let t=Object.entries(e).filter(e=>e[0].startsWith("ingredient")&&""!==e[1]).map(e=>{let t=e[1].split(",").map(e=>e.trim());if(3!==t.length)throw Error("wrong ingredient format! please use the currect format :)");let[r,a,s]=t;return{quantity:r?+r:null,unit:a,description:s}}),r={title:e.title,source_url:e.sourceUrl,image_url:e.image,publisher:e.publisher,cooking_time:+e.cookingTime,servings:+e.servings,ingredients:t},a=await c(`${o}?key=b2773b78-484b-471c-95d0-f62282d51797`,r);d.recipe=u(a),m(d.recipe)}catch(e){throw e}};class k{_parentElement=document.querySelector(".search");getQuary(){let e=this._parentElement.querySelector(".search__field").value;return this.clearInput(),e}clearInput(){this._parentElement.querySelector(".search__field").value=""}addHandlerSearch(e){this._parentElement.addEventListener("submit",function(t){t.preventDefault(),e()})}}var b=new k;let y=new URL(t).href;var w=new class extends a{_parentElement="";_generateMarkup(){let e=window.location.hash.slice(1);return`
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
                    <use href="${y}#icon-user"></use>
                  </svg>
                </div>
              </div>
            </a>
          </li>`}};class $ extends a{_parentElement=document.querySelector(".results");_errorMessage=" No recipes found for your query. Please try again ;)";_message="";_generateMarkup(){return this._data.map(e=>w.render(e,!1)).join("")}}var E=new $;let S=new URL(t).href;class q extends a{_parentElement=document.querySelector(".pagination");addHandlerClick(e){this._parentElement.addEventListener("click",function(t){let r=t.target.closest(".btn--inline");r&&e(+r.dataset.goto)})}_generateMarkup(){let e=this._data.page,t=Math.ceil(this._data.results.length/this._data.resultsPerPage);return 1===e&&t>1?`
          <button data-goto="${e+1}" class="btn--inline pagination__btn--next">
            <span>Page ${e+1}</span>
            <svg class="search__icon">
              <use href="${S}#icon-arrow-right"></use>
            </svg>
          </button>`:e===t&&t>1?`
         <button data-goto="${e-1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${S}#icon-arrow-left"></use>
            </svg>
            <span>Page ${e-1}</span>
          </button>
          `:e<t?`
       <button data-goto="${e-1}" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${S}#icon-arrow-left"></use>
            </svg>
            <span>Page ${e-1}</span>
          </button>
           <button data-goto="${e+1}" class="btn--inline pagination__btn--next">
            <span>Page ${e+1}</span>
            <svg class="search__icon">
              <use href="${S}#icon-arrow-right"></use>
            </svg>
          </button>`:"Only one page"}}var H=new q;class M extends a{_parentElement=document.querySelector(".bookmarks__list");_errorMessage=" No bookmarks yet. Find a nice recipe and bookmark it :)";_message="";addHandlerRender(e){window.addEventListener("load",e)}_generateMarkup(){return this._data.map(e=>w.render(e,!1)).join("")}}var L=new M;class P extends a{_parentElement=document.querySelector(".upload");_message="Recipe was successfully uploaded :)";_window=document.querySelector(".add-recipe-window");_overlay=document.querySelector(".overlay");_btnOpen=document.querySelector(".nav__btn--add-recipe");_btnClose=document.querySelector(".btn--close-modal");constructor(){super(),this._addHandlerShowWindow(),this._addHandlerHideWindow()}toggleWindow(){this._overlay.classList.toggle("hidden"),this._window.classList.toggle("hidden")}_addHandlerShowWindow(){this._btnOpen.addEventListener("click",this.toggleWindow.bind(this))}_addHandlerHideWindow(){this._btnClose.addEventListener("click",this.toggleWindow.bind(this)),this._overlay.addEventListener("click",this.toggleWindow.bind(this))}addHandlerUPload(e){this._parentElement.addEventListener("submit",function(t){t.preventDefault(),e(Object.fromEntries([...new FormData(this)]))})}_generateMarkup(){}}var x=new P;async function T(){try{let e=window.location.hash.slice(1);if(!e)return;n.renderSpinner(),E.update(_()),L.update(d.bookmarks),await l(e),n.render(d.recipe)}catch(e){console.error(e),alert(e)}}async function A(){try{E.renderSpinner();let e=b.getQuary();if(!e)return;await p(e),E.render(_()),H.render(d.search)}catch(e){console.error(e)}}async function j(e){try{x.renderSpinner(),await f(e),console.log(d.recipe),n.render(d.recipe),x.renderMessage(),L.render(d.bookmarks),window.history.pushState(null,"",`#${d.recipe.id}`),setTimeout(()=>{x.toggleWindow()},5e3)}catch(e){console.error("💥",e),x.renderError(e.message)}}document.querySelector(".recipe");L.addHandlerRender(function(){L.render(d.bookmarks)}),n.addHandler(T),n.addHandlerUpdateServings(function(e){h(e),n.update(d.recipe)}),n.addHandlerAddBookmark(function(){d.recipe.bookmarked?v(d.recipe.id):m(d.recipe),n.update(d.recipe),L.render(d.bookmarks)}),b.addHandlerSearch(A),H.addHandlerClick(function(e){E.render(_(e)),H.render(d.search)}),x.addHandlerUPload(j);
//# sourceMappingURL=Proyect_ProgramacionConJava2.46c4f86a.js.map
