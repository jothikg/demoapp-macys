import Mn from 'backbone.marionette';
import $ from 'jquery';
import DataBinding from '../utils/databinding';

const ShippingAddressHtml = `
      <label class="col-sm-2 control-label">Shipping Address</label>
      <div class="col-sm-10">
        <span>{model:address1}</span>
        <span>{model:address2}</span>
        <span>{model:city}</span>
        <span>{model:state}</span>
        <span>{model:zip}</span>
      </div>`;

const ShippingAddressView = Mn.View.extend({
  behaviors: [DataBinding],
  tagName: 'div',
  className: 'form-group',
  html: ShippingAddressHtml
});

export default Mn.View.extend({
  html: require('./template.html'),

  behaviors: [DataBinding],

  events: {
    'click button': 'onConfirm'
  },

  regions: {
    partials: '#review-partials'
  },

  triggers: {
    'click #confirm': 'confirm:save:model'
  },

  onConfirm(event) {
    const $address1 = this.$el.find('.address1');
    if (!/[\w]/.test($address1.val())) {
      $address1.addClass('error');
    } else {
      $address1.removeClass('error');
    }

    const $city = this.$el.find('.city');
    if (!/[\w]/.test($city.val())) {
      $city.addClass('error');
    } else {
      $city.removeClass('error');
    }

    const $state = this.$el.find('.state');
    if (!/[\w]/.test($state.val())) {
      $state.addClass('error');
    } else {
      $state.removeClass('error');
    }

    const $zip = this.$el.find('.zip');
    if (!/[\d]/.test($zip.val()) && $zip.val().length !== 5) {
      $zip.addClass('error');
    } else {
      $zip.removeClass('error');
    }

    if (!this.$el.find('.error').length) {
      this.showChildView('partials', new ShippingAddressView({model: this.model}));
      $('.button-bar').hide();
    }
  }
});
