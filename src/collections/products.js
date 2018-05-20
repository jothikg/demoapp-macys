import Backbone from 'backbone';
import Product from '../models/product';

/*
 *	Data model collection for Products
 */
const Products = Backbone.Collection.extend({
  model: Product
});

export default Products;
