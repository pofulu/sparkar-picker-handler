# PickerHandler

**PickerHandler** is a wrapper of [NativeUI.picker](https://sparkar.facebook.com/ar-studio/learn/documentation/reference/classes/nativeuimodule/) in Spark AR. Please note that this tool is  **Script Only**. Although there is a sample project show how to use this tool with Patch Editor, this libaray is not Patch friendly.



## Install

### Import

0. [Download PickerHandler](https://raw.githubusercontent.com/pofulu/sparkar-picker-handler/master/PickerHandlerDemo/single/scripts/PickerHandler.js) (Right click and Save as)

1. [Download Invoke](https://raw.githubusercontent.com/pofulu/sparkar-picker-handler/master/PickerHandlerDemo/single/scripts/Invoke.js) (Right click and Save as)

2. Drap/Import them to Assets caetgory in Spark AR.

3. Use `require` to import this module at the top of your script.

    ```javascript
    const Picker = require('./PickerHandler');
    
    // Your script...
    ```


3. You can also [Click Here to Download Sample Projects](https://yehonal.github.io/DownGit/#home?url=https://github.com/pofulu/sparkar-picker-handler/tree/master/PickerHandlerDemo).



### npm

0. Add package with `yarn` or `npm`

    ```shell
    yarn add sparkar-picker-handler
    ```

    or

    ```shell
    npm i sparkar-picker-handler
    ```

1. Use `require` to import this module

    ```javascript
    const Picker = require('sparkar-picker-handler');
    // Your script...
    ```




## Usage

### Default configure

You need to call the `config` function manually. For very basic useage, you can just call `configUsingDefault()`.

```javascript
Picker.configUsingDafault()
```

And then set the "DEFAULT" field in `PickerHandler.js`

```javascript
//–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– DEFAULT
const initalIndex = 0;
const texturesName = [
    'img_picker_0',
    'img_picker_1',
];

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––
```



### Manually configure

First, set the picker visible manually.

```javascript
Picker.setVisible(true);
```

You can config picker with **array of names** or **name pattern**.

```javascript
Picker.configUsingNames(['img_picker_red', 'img_picker_black'], 0);
// or
Picker.configUsingPattern('img_picker_*', 0)
```

Since  `configUsingPattern()` will get picker images in random order, you can pass your prefer sort function.

```javascript
const mySort = (n1, n2) => n1.substring('pic_'.length) - n2.substring('pic_'.length);

Picker.configUsingPattern('pic_*', 0, mySort);
```



### Subscribe Functions

You can then subscribe your selected function after configuring the picker.

```javascript
Picker.configUsingDefault().then(() => {
    Picker.subscribeIndex(1, () => Diagnostics.log('index is 1'));
    Picker.subscribeKeywords('red', () => Diagnostics.log("texture name includes 'red'"));
});
```



### Other Functions

`unsubscribeAll()`: Unsubscribe all selceted function.

`setIndex()`: Set PickerHandler to desired index.