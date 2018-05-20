import Backbone from 'backbone';

/*
 *  Base model for Order
 */
const Order = Backbone.Model.extend({
  defaults: {
    product: 1,
    size: 'S',
    color: 'R',
    quantity: 1,
    firstName: '',
    lastName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: ''
  }
});

export default Order;
