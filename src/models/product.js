import Backbone from 'backbone';

/* 
 *  Base model for Product.
 */
const Product = Backbone.Model.extend({
  defaults: {
    name: '',
    image: '',
  }
});

export default Product
