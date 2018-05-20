import {Route} from 'marionette.routing';
import Radio from 'backbone.radio';
import _ from 'underscore';
import $ from 'jquery';
import DetailView from './view';

export default Route.extend({

  viewClass: DetailView,

  /*
   * Called when route is currently inactive and about to be activated
   */
  activate(transition){
    let products = this.getContext().request('products');

    this.product = products.findWhere({id: +transition.params.productid});
    if (!this.product) {
      throw new Error('Unable to resolve contact with id', transition.params.productid);
    }
    this.newOrderInfo = this.getContext().request('newOrder');
  },

  /* 
   * Setting new orderInfo and return the model
   */
  viewOptions() {
    this.newOrderInfo.set({
      product: this.product.get('id'),
      name: this.product.get('name'),
      image_path: this.product.get('image_path')
    });
    return {
      model: this.newOrderInfo.clone()
    }
  },

  viewEvents: {
    'save:model': 'onSaveModel'
  },

  /* 
   * Function gets called when Save Order called
   */
  onSaveModel(view) {
    let attributes = _.clone(view.model.attributes);
    attributes.color = view.ui.color.filter(':checked').val();
    attributes.size = view.ui.size.filter(':checked').val();
    this.newOrderInfo.clear({silent:true}).set(attributes);

    let savePromise = Radio.channel('api').request('saveOrder', attributes);

    savePromise.then(saveData => {
      Radio.channel('transit').trigger('go:order', 'abcdefghijklmnopqrstuvxyz');
    });
  }
})
