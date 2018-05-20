import { Route } from 'marionette.routing';
import Radio from 'backbone.radio';
import Order from '../models/order';
import ReviewOrderView from './view';


export default Route.extend({
  viewClass: ReviewOrderView,

  activate() {
    let getPromise = Radio.channel('api').request('getOrder');
    return getPromise.then(orderData => {
      this.reviewOrder = new Order(orderData)
    });
  },

  viewOptions() {
    return {
      model: this.reviewOrder.clone()
    };
  },

  viewEvents: {
    'confirm:save:model': 'onConfirmOrder'
  },

  onConfirmOrder(view) {
    return;
    let attributes = _.clone(view.model.attributes);
    this.reviewOrder.clear({silent:true}).set(attributes);

    let savePromise = Radio.channel('api').request('saveOrder', attributes);
    return savePromise.then(saveData => {
      //console.log('-=-=confirmData.. ', saveData);
    });
  }
});
