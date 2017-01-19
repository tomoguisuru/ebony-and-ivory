import Ember from 'ember';

const {
  Component,
  set,
} = Ember;

const MidiPianoComponent = Component.extend({
  classNames: ['flex'],

  is_loading: false,

  didReceiveAttrs() {
    set(this, 'is_loading', true);

    MIDI.loadPlugin({
      instrument: 'acoustic_grand_piano',
      onprogress: (state, progress) => {
        console.log(state, progress);
      },
      onsuccess: () => {
        set(this, 'is_loading', false);
      },
    });
  },

  actions: {

    play_note(note) {
      const delay = 0;      // play one note every quarter second
      const velocity = 127; // how hard the note hits

      // play the note
      MIDI.setVolume(0, 127);
      MIDI.noteOn(0, note, velocity, delay);
      MIDI.noteOff(0, note, delay + 0.75);
    },

  }
});

export default MidiPianoComponent;
