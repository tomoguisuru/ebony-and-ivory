import Ember from 'ember';

const {
  Component,
  get,
} = Ember;

const PianoKeyComponent = Component.extend({

  classNames: ['flex-20'],
  classNameBindings: ['is_black_key:black-key:white-key'],

  is_black_key: false,

  click(e) {
    e.preventDefault();

    const click_cb = get(this, 'click_cb');

    if (click_cb) {
      click_cb();
    }
  },

});

export default PianoKeyComponent;
