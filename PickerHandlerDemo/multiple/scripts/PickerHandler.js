import { onSetSignalThen } from './Invoke';

const NativeUI = require('NativeUI');
const Textures = require('Textures');
const Reactive = require('Reactive');
const Diagnostics = require('Diagnostics');
const Picker = NativeUI.picker;

//–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– DEFAULT
const initalIndex = 0;
const texturesName = [
    'img_picker_1',
    'img_picker_2',
    'img_picker_3',
];

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

let currentConfig;
let subscriptions = [];

function configure(textures, startIndex) {
    currentConfig = {
        selectedIndex: -1,
        items: textures.map(i => ({ image_texture: i }))
    };

    Picker.configure(currentConfig);

    return onSetSignalThen(NativeUI.picker.selectedIndex, () => Picker.selectedIndex = Reactive.val(startIndex));
}

function HandleError(error) {
    Diagnostics.log(error.toString());
}

/**
 * Please set the "DEFAULT" field in `Picker.js`
 * @returns {Promise}
 */
export function configUsingDafault() {
    unsubscribeAll();

    Picker.visible = Reactive.val(true);

    return configUsingNames(texturesName, initalIndex);
}

export function configUsingNames(textureNameArray, startIndex = 0) {
    const removeEmpty = textures => textures.filter(n => n);

    const fetchTextures = textureNameArray.map(name =>
        Textures.findFirst(name).then(result => {
            if (result == undefined) {
                Diagnostics.log(`Error: There is no texture called '${name}'.`);
            } else {
                return result;
            }
        })
    );

    return Promise.all(fetchTextures)
        .then(removeEmpty)
        .then(texs => configure(texs, startIndex))
        .catch(HandleError)
}

/**
 * Please note that the pattern matched result may be with random order
 * @param {string} namePattern 
 * @param {number} startIndex 
 * @returns {Promise<void>}
 */
export function configUsingPattern(namePattern, startIndex = 0, sort = (name1, name2) => name1 - name2) {
    const sortTextuers = results => sort == null ? results : results.sort((a, b) => sort(a.name, b.name));
    const checkLength = results => results.length == 0 ? Promise.reject(`No matching result for pattern ${namePattern}`) : results;

    return Textures.findUsingPattern(namePattern)
        .then(checkLength)
        .then(sortTextuers)
        .then(texs => configure(texs, startIndex))
        .catch(HandleError)
}

/**
 * @param {BoolSignal | boolean} visible 
 */
export function setVisible(visible) {
    Picker.visible = visible;
}

/**
 * @param {number | ScalarSignal} index
 * @param {{(index: number): void}} callback
 */
export function subscribeIndex(index, callback) {
    const sub = Picker.selectedIndex.eq(index).onOn({ fireOnInitialValue: true }).subscribe(callback);
    subscriptions.push(sub);
    return sub;
}

/**
 * @param {string} textureNameKeyword 
 * @param {{(index: number): void}} callback 
 */
export function subscribeKeywords(textureNameKeyword, callback) {
    const sub = Picker.selectedIndex.monitor({ fireOnInitialValue: true }).select('newValue').subscribe(index => {
        const indexInRange = index >= 0 && index < currentConfig.items.length;
        if (indexInRange && currentConfig.items[index].image_texture.name.indexOf(textureNameKeyword) !== -1) {
            callback(index)
        }
    })
    subscriptions.push(sub);
    return sub;
}

export function unsubscribeAll() {
    subscriptions.forEach(s => s.unsubscribe());
    subscriptions = [];
}

export function setIndex(toIndex) {
    currentConfig.selectedIndex = toIndex;
    Picker.configure(currentConfig);
}

export default Picker;