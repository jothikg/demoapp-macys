import Mn from 'backbone.marionette';
import DataBinding from '../utils/databinding';

/*
 * View Component for Product Detail page
 */
export default Mn.View.extend({
  html: require('./template.html'),

  behaviors: [DataBinding],

  ui: {
    size: 'input[name=size]',
    color: 'input[name=color]'
  },

  triggers: {
    'click #save-contact': 'save:model'
  }
});
