import preview from './preview.js';
import View from './view.js';
//import icons from '../img/icons.svg'; //parcel 1
import icons from 'url:../../img/icons.svg'; //parcel 2

class BookMarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet. Find a nice recipe and bookmark it';
  _message = '';

  addhandlerBookmarks(handler) {
    window.addEventListener('load', handler);
  }
  _generateMarkup() {
    return this._data.map(bookmark => preview.render(bookmark, false)).join('');
  }
}

export default new BookMarksView();
/*
<div class="preview__user-generated">
          <svg>
            <use href="${icons}#icon-user"></use>
          </svg>
        </div>

preview__link--active

*/
