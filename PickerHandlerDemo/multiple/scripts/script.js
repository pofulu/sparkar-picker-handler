const Diagnostics = require('Diagnostics');
const Picker = require('./PickerHandler');

initPicker();

//–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– 
Picker.setVisible(true);

function config_picker_set2() {
    Picker.unsubscribeAll();
    Picker.configUsingPattern('picker_set2_*', 1).then(() => {
        Picker.subscribeKeywords('0', initPicker);
        Picker.subscribeKeywords('0', () => Diagnostics.log('back'));
        Picker.subscribeKeywords('picker', index => Diagnostics.log(`current index: ${index.newValue}`));
    });
}

function config_picker_set1() {
    Picker.unsubscribeAll();
    Picker.configUsingPattern('picker_set1_*', 1).then(() => {
        Picker.subscribeKeywords('0', initPicker);
        Picker.subscribeKeywords('0', () => Diagnostics.log('back'));
        Picker.subscribeKeywords('picker', index => Diagnostics.log(`current index: ${index.newValue}`));
    });
}

function initPicker() {
    Picker.unsubscribeAll();
    Picker.configUsingPattern('picker_set0_*', 0).then(() => {
        Picker.subscribeKeywords('1', config_picker_set1);
        Picker.subscribeKeywords('2', config_picker_set2);
    })
}