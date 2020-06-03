const NativeUI = require('NativeUI');
const Textures = require('Textures');
const Reactive = require('Reactive');
const Diagnostics = require('Diagnostics');
const Picker = NativeUI.picker;

//–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– DEFAULT
const initalIndex = 0;
const texturesName = [];

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––

let currentConfig;
let currentSubscriptions = [];
let subscriptions = [];

function configure(textures, startIndex) {
    currentConfig = {
        selectedIndex: startIndex,
        items: textures.map(i => ({ image_texture: i }))
    };

    Picker.configure(currentConfig)
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
 * Please note that Picker's index will **ALWAYS** set to `0` on Facebook when you set visible from `false` to `true`.
 * @param { boolean | BoolSignal } visible
 */
export function setVisible(visible) {
    Picker.visible = visible;

    if (currentConfig == null) return;

    if (visible) {
        Picker.configure(currentConfig);

    } else {
        Picker.configure({ selectedIndex: currentConfig.selectedIndex, items: [] });
    }
}

/**
 * @param {number | ScalarSignal} index
 * @param {{(index: {newValue: number, oldValue?:number}): void}} callback 
 * @returns {Promise<Subscription>}
 */
export function subscribeIndex(index, callback) {
    currentSubscriptions.push({ type: 0, conditions: index, event: callback });
    const sub = Picker.selectedIndex.monitor({ fireOnInitialValue: true }).subscribe(result => {
        if (result.newValue == index) {
            currentConfig.selectedIndex = index;
            callback(result);
        }
    });
    subscriptions.push(sub)
}

/**
 * @param {string} textureNameKeyword 
 * @param {{(index: {newValue: number, oldValue?:number}): void}} callback 
 * @returns {Promise<Subscription>}
 */
export function subscribeKeywords(textureNameKeyword, callback) {
    currentSubscriptions.push({ type: 1, conditions: textureNameKeyword, event: callback });
    const sub = Picker.selectedIndex.monitor({ fireOnInitialValue: true }).subscribe(result => {
        const newValue = result.newValue;
        const indexInRange = newValue >= 0 && newValue < currentConfig.items.length;
        if (indexInRange && currentConfig.items[newValue].image_texture.name.indexOf(textureNameKeyword) !== -1) {
            callback(result)
            currentConfig.selectedIndex = newValue;
        }
    })

    subscriptions.push(sub);
}

export function unsubscribeAll() {
    subscriptions.forEach(s => s.unsubscribe());
    subscriptions = [];
    currentSubscriptions = [];
}

export function setIndex(toIndex) {
    Picker.selectedIndex = toIndex;
}

export default Picker;