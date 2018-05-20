import { Route } from 'marionette.routing';
import { MockAPI } from '../utils/mock-api';
import Order from '../models/order';
import Products from '../collections/products';

export default Route.extend({
  activate(){
    this.api = new MockAPI();
    this.newOrderInfo = new Order();
    return this.api.getProductList().then(list => {
      this.products = new Products(list)
    });
  },

  channelName: 'api',

  contextRequests: {
    /*
     * Function to return the list of products
     * @return object - return list of products
    */
    products: function () {
      return this.products
    },

    /*
     * Function to return new order info
     * @return object - return new order info
    */
    newOrder: function () {
      return this.newOrderInfo
    }
  },

  /*
   * Function to return new order info
   * @return object - return new order info
  */
  radioRequests: {

    /*
     * Function facilitates to save order
     * @return object - returns order data
    */

    'saveOrder': function (data) {
      return this.api.saveOrder(data)
    },

    /*
     * Function to return order Info
     * @return object - return the order Info
    */
    'getOrder': function () {
      return this.api.getOrder()
    }
  }
});
