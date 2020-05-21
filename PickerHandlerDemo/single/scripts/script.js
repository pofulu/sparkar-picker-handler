const Diagnostics = require('Diagnostics');
const Picker = require('./PickerHandler');

Picker.setVisible(true);

// Picker.configUsingPattern('img_picker_*', 0, sortReverse).then(subscribeFunctions);
// or
// Picker.configUsingNames(['img_picker_0', 'img_picker_1', 'img_picker_2', 'img_picker_3'], 0).then(subscribeFunctions);
// or
Picker.configUsingDafault().then(subscribeFunctions);

function subscribeFunctions() {
    Picker.subscribeKeywords('0', () => Diagnostics.log('call event when texture name includes 0'));
    Picker.subscribeKeywords('1', () => Diagnostics.log('call event when texture name includes 1'));
    Picker.subscribeKeywords('2', () => Diagnostics.log('call event when texture name includes 2'));
    Picker.subscribeKeywords('3', () => Diagnostics.log('call event when texture name includes 3'));
    Picker.subscribeKeywords('4', () => Diagnostics.log('call event when texture name includes 4'));

    Picker.subscribeIndex(1, () => Diagnostics.log('call event when index is 1'));
    Picker.subscribeIndex(2, () => Diagnostics.log('call event when index is 2'));
    Picker.subscribeIndex(3, () => Diagnostics.log('call event when index is 3'));
    Picker.subscribeIndex(4, () => Diagnostics.log('call event when index is 4'));

    Picker.subscribeKeywords('picker', index => Diagnostics.log(`currentIndex: ${index.newValue}`));
}

function sortReverse(textureName1, textureName2) {
    return textureName2.substring('img_picker_'.length) - textureName1.substring('img_picker_'.length);
}