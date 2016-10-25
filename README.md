# PaperGUI


A clone of [dat.GUI](https://github.com/dataarts/dat.gui) using nice
[Polymer (1.0)](https://www.polymer-project.org/1.0/docs/) paper elements. One of the advantages is that this makes it touch and mobile friendly. The API is intentionally similar, although not all features have been ported to PaperGUI.


## Install


Building requires node, gulp and bower.
```
npm install gulp bower
npm install
npm run-script build
```
The `dist` folder contains the build. The `paper-gui.html` file is the only one
you need if you want to use web component-style, synchronous import.
Otherwise, you'll need all 3 files in the `dist` folder as `paperGUI.js` loads
the other two.


To try out the demo, run a webserver in the papergui root folder, eg:
```python
python -m SimpleHTTPServer 8000
```
Then open http://localhost:8000/demo.html in a browser.


## Usage


### Basic usage


With very little code, PaperGUI creates an interface that you can use to modify variables, exactly like [dat.GUI](https://workshop.chromeexperiments.com/examples/gui/#1--Basic-Usage) from which the below example is adapted.
```html
<script type="text/javascript">
var FizzyText = function() {
  this.message = 'PaperGUI';
  this.speed = 0.8;
  this.displayOutline = false;
  this.explode = function() { ... };
  // Define render logic ...
};

/* Polymer elements are loaded asynchronously, we need to wait for
 * everything to be ready before creating the GUI. */
document.addEventListener('PaperGUIReady', function(e) {
  var text = new FizzyText();
  var gui = new PaperGUI();
  gui.add(text, 'message');
  gui.add(text, 'speed', -5, 5);
  gui.add(text, 'displayOutline');
  gui.add(text, 'explode');
};
</script>

<!-- Load the PaperGUI library and polyfills -->
<script type="text/javascript" src="dist/paperGUI.js"></script>
```

- The property must be public, i.e. defined by `this.prop = value`
- PaperGUI determines controller type based on a property's initial value
- Press H to show/hide all GUI's.

##### Importing PaperGUI as a web component

As shown above, the `paperGUI.js` script loads a polyfill and then imports the web components necessary for the PaperGUI library to work. Once it's all set, it triggers a `PaperGUIReady` event. This allows to delay the loading of PaperGUI as much as possible.

Alternatively, you can skip the loader script call and use a (blocking) import directly. Add this at the top of your HTML:

```html
<link rel="import" href="dist/paper-gui.html">
```

Note that in this case no `PaperGUIReady` event will be triggered, and the import will only work on web component-ready browsers as this bypasses support detection and polyfill loading.

### Constrain


You can specify limits on numbers. A number with a min and max value becomes a slider. This is exactly the [same API as dat.GUI](https://workshop.chromeexperiments.com/examples/gui/#2--Constraining-Input).


```javascript
gui.add(text, 'noiseStrength').step(5); // Increment amount
gui.add(text, 'growthSpeed', -5, 5); // Min and max
gui.add(text, 'maxSize').min(0).step(0.25); // Mix and match
```
You can also choose to select from a dropdown of values for both numbers and strings.
```javascript
// Choose from accepted values
gui.add(text, 'message', [ 'pizza', 'chrome', 'hooray' ] );


// Choose from named values
gui.add(text, 'speed', { Stopped: 0, Slow: 0.1, Fast: 5 } );
```


### Events


You can listen for events on individual controllers using an event listener syntax.


```javascript
var controller = gui.add(fizzyText, 'maxSize', 0, 10);


controller.onChange(function(value) {
  // Fires on every change, drag, keypress, etc.
});
```


Note: the `onFinishChange` handler [from dat.GUI](https://workshop.chromeexperiments.com/examples/gui/#7--Events) is currently not supported.


## Styling & positioning


PaperGUI exposes custom CSS properties and mixins (see [Polymer documentation](https://www.polymer-project.org/1.0/docs/devguide/styling#custom-css-properties)) through which you can change the colors and style of the UI.


### Custom properties


Properties below can be used to modify the default colors of the PaperGUI interface and components:


| Custom Property                     | Description                                                                  |
| ----------------------------------- |------------------------------------------------------------------------------|
| `--paper-gui-accent-color`          | Accent used in the floating action button, toggle buttons, sliders, etc.     |
| `--paper-gui-accent-contrast-color` | Applied to fonts and icons where the background uses accent color (buttons)  |
| `--paper-gui-background-color`      | Background color of the main dialog                                          |
| `--paper-gui-text-color`            | Main color for text inputs, labels, dropdown values, etc.                    |
| `--paper-gui-ui-color`              | Used in components (borders, sliders, input placeholders, etc.)              |
| `--paper-gui-ui-secondary-color`    | Lighter shade of the above color, used in scrollbars and dividers            |


##### Example


In your main html file, declare the following [custom-style](https://www.polymer-project.org/1.0/docs/devguide/styling#custom-css-properties) to override default colors:


```html
<style is="custom-style">
  paper-gui {
    --paper-gui-text-color: #808080;
    --paper-gui-background-color: white;
    --paper-gui-accent-color: #1976d2;
    --paper-gui-ui-color: #bbb;
    --paper-gui-ui-secondary-color: #f1f1f1;
  }
</style>
```


### Mixins
If you need to further customize the edit button or the dialog, ie change their positioning or size, you can use dedicated custom mixins.


| Custom Mixin                        | Description                                                                                        |
| ----------------------------------- |----------------------------------------------------------------------------------------------------|
| `--paper-gui-edit-button`           | Use this to customize the edit button                                                              |
| `--paper-gui-dialog`                | Use this to override the size and positioning of the dialog (eg to place it in a different corner) |


##### Example
In your main html file:


```html
<style is="custom-style">
  paper-gui {
    --paper-gui-edit-button: {
      position: relative;
      top: 0;
      left: 0;
    };
    --paper-gui-dialog: {
      position: absolute;
      top: auto;
      right: auto;
      bottom: 0;
      left: 0;
      width: 50%;
    };
  }
</style>
```


## Reference


### PaperGUI constructor parameters

The PaperGUI constructor can accept an object containing various options (eg. `var gui = new PaperGUI({autoPlace: false});`)

| Property name | Type    | Description |
|---------------|---------|-------------|
| `autoPlace`   | Boolean | Whether to automatically append the PaperGUI element to the DOM as soon as at least one controller has been added. Default is **true**. |


### PaperGUI methods

PaperGUI has several methods.

| Method name | Description |
|-------------|-------------|
| `add()`     | Creates and returns a new UI controller (controller type varies depending on the arguments, see next section). |
| `el()`      | Returns the main Element for this PaperGUI (ie a `paper-gui` component). Useful for attaching it to the DOM manually when `autoPlace` is disabled. |
| `open()`    | Opens the dialog containing the controllers. Equivalent to clicking the edit button. |
| `close()`   | Closes the dialog containing the controllers. Equivalent to clicking the close button in the dialog. |
| `hide()`    | Hides all PaperGUI elements (edit button, dialog with controllers). Equivalent to pressing the 'H' key. |
| `show()`    | Shows all previously hidden PaperGUI elements. |



### Controller types

Here's a summary of the controller types PaperGUI currently supports:


| PaperGUI Controller type | Property type | Extra parameters |
|--------------------------|---------------|------------------|
| Button                   | Function      | *N/A*            |
| Toggle                   | Boolean       | *N/A*            |
| Text input               | String        | *N/A*            |
| Select box               | String        | **[String value]** An array of accepted values for the property, required to create a select box instead of a text input)|
| Slider                   | Number        | **Number minValue** (optional, default 0), **Number maxValue** (optional, default 100) |
| Select box               | Number        | **{String label: Number value}** An object whose property names will be used as labels and corresponding values will be set on the property when selected. Required to create a select box instead of a slider.|


### Controller methods


All controller methods return themselves, allowing to chain method calls. Here is a list of methods.


| Method                       | Description                                              | Controller types  |
|------------------------------|----------------------------------------------------------|-------------------|
| `name(labelString)`          | Defines the label or placeholder text for the controller | All               |
| `onChange(callbackFunction)` | Calls the function when the value changes                | All except Button |
| `min(minNumber)`             | Sets the minimum authorized value                        | Slider            |
| `max(minNumber)`             | Sets the maximum authorized value                        | Slider            |
| `step(stepNumber)`           | Sets the step size                                       | Slider            |


## TODO


- Add live demos
- Add folders/tabs structure capability and other features from the original dat.GUI


## Known issues


- Select box change callback fires on controller creation (intended?)
