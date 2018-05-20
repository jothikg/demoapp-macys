import Mn from 'backbone.marionette';
import { RouterLink } from 'marionette.routing';
import DataBinding from '../utils/databinding';

const itemHtml = `
        <a>
          <img rv-src="model:image_path" rv-alt="model:name" height="150" width="150" />
          <p class="list-group-item-text">{model:name}</p>
        </a>`;

/*
 * View Component for Product Item page
 */
const ProductItemView = Mn.View.extend({
  behaviors: [DataBinding],
  tagName: 'li',
  className: 'list-group-item',
  attributes: {
    route: 'detail',
    'rv-param-productid': 'model:id'
  },
  html: itemHtml
});

/*
 * View Component for Product Item page
 */
const BrowseListView = Mn.CollectionView.extend({
  tagName: 'ul',
  className: 'list-group',
  childView: ProductItemView,
  behaviors: [RouterLink]
});


export default Mn.View.extend({
  behaviors: [DataBinding],
  html: require('./template.html'),
  regions: {
    browseList: '.browse'
  },
  
  initialize(options) {
    this.products = options.products
  },

  onRender() {
    this.showChildView('browseList', new BrowseListView({collection: this.products}));
  }
});
