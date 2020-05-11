const Diagnostics = require('Diagnostics');
const Picker = require('./PickerHandler');
const TouchGestures = require('TouchGestures');

let visible = true;

Picker.configUsingDafault().then(() => {
    Picker.subscribeKeywords('picker', index => Diagnostics.log(`currentIndex: ${index}`));
});

TouchGestures.onTap().subscribe(() => {
    visible = !visible;
    Picker.setVisible(visible);
})