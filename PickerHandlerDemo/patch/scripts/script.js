const Diagnostics = require('Diagnostics');
const Patches = require('Patches');
const Picker = require('./PickerHandler');

Picker.setVisible(true);

// Picker.configUsingPattern('img_picker_*', 0, sortReverse).then(subscribeFunctions);
// or
// Picker.configUsingNames(['img_picker_0', 'img_picker_1', 'img_picker_2', 'img_picker_3'], 0).then(subscribeFunctions);
// or
Picker.configUsingDafault().then(subscribeFunctions);

function subscribeFunctions() {
    Picker.subscribeKeywords('picker', index => Patches.inputs.setScalar('picker', index.newValue));
}

function sortReverse(textureName1, textureName2) {
    return textureName2.substring('img_picker_'.length) - textureName1.substring('img_picker_'.length);
}