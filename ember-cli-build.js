/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
  });

  // polyfill
  app.import('bower_components/midi/inc/shim/Base64.js');
  app.import('bower_components/midi/inc/shim/Base64binary.js');
  app.import('bower_components/midi/inc/shim/WebMIDIAPI.js');

  // midi.js package
  app.import('bower_components/midi/js/midi/audioDetect.js');
  app.import('bower_components/midi/js/midi/gm.js');
  app.import('bower_components/midi/js/midi/loader.js');
  app.import('bower_components/midi/js/midi/plugin.audiotag.js');
  app.import('bower_components/midi/js/midi/plugin.webaudio.js');
  app.import('bower_components/midi/js/midi/plugin.webmidi.js');

  // Utils
  app.import('bower_components/midi/js/util/dom_request_script.js');
  app.import('bower_components/midi/js/util/dom_request_xhr.js');

  app.import('bower_components/midi/examples/soundfont/acoustic_grand_piano-ogg.js');


  return app.toTree();
};
