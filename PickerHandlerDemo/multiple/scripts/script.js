const Diagnostics = require('Diagnostics');
const Picker = require('./PickerHandler');

initPicker();

//–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– 
Picker.setVisible(true);

function config_picker_set2() {
    Picker.unsubscribeAll();
    Picker.configUsingPattern('img_picker_set2_*', 1, sort_set2).then(() => {
        Picker.subscribeKeywords('0', initPicker);
        Picker.subscribeKeywords('0', () => Diagnostics.log('back'));
        Picker.subscribeKeywords('picker', index => Diagnostics.log(`current index: ${index.newValue}`));
    });
}

function config_picker_set1() {
    Picker.unsubscribeAll();
    Picker.configUsingPattern('img_picker_set1_*', 1, sort_set1).then(() => {
        Picker.subscribeKeywords('0', initPicker);
        Picker.subscribeKeywords('0', () => Diagnostics.log('back'));
        Picker.subscribeKeywords('picker', index => Diagnostics.log(`current index: ${index.newValue}`));
    });
}

function initPicker() {
    Picker.unsubscribeAll();
    Picker.configUsingPattern('img_picker_set0_*', 0, sort_set0).then(() => {
        Picker.subscribeKeywords('1', config_picker_set1);
        Picker.subscribeKeywords('2', config_picker_set2);
    })
}


//–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– sort

function sort_set2(textureName1, textureName2) {
    return textureName1.substring('img_picker_set2_'.length) - textureName2.substring('img_picker_set2_'.length);
}

function sort_set1(textureName1, textureName2) {
    return textureName1.substring('img_picker_set1_'.length) - textureName2.substring('img_picker_set1_'.length);
}

function sort_set0(textureName1, textureName2) {
    return textureName1.substring('img_picker_set0_'.length) - textureName2.substring('img_picker_set0_'.length);
}