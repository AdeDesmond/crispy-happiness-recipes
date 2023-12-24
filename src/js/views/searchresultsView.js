import View from './view.js';
import preview from './preview.js';
//import icons from '../img/icons.svg'; //parcel 1
import icons from 'url:../../img/icons.svg'; //parcel 2

class SearchResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query please try again';
  _message = '';
  _generateMarkup() {
    return this._data
      .map(searchresult => preview.render(searchresult, false))
      .join('');
  }
}

export default new SearchResultsView();
/*
<div class="preview__user-generated">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>

preview__link--active

*/
