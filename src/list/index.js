import { Route } from 'marionette.routing';
import Radio from 'backbone.radio';
import ListCollectionView from './view';



export default Route.extend({
	
  viewClass: ListCollectionView,

  activate() {
    this.products = this.getContext().request('products');
  },

  viewOptions() {
    return {
      products: this.products
    };
  }
});
