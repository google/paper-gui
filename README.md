# PaperGUI

A clone of [dat.GUI](https://github.com/dataarts/dat.gui) using nice
[Polymer](https://www.polymer-project.org/1.0/docs/) paper elements.

## Install

Building requires node, gulp and bower.

`npm install gulp bower`

`npm install`

`npm run-script build`

The `dist` folder contains the build. The `paper-gui.html` file is the only one
you need if you want to use webcomponent-style, synchronous import.
Otherwise, you'll need all 3 files in the `dist` folder as `paperGUI.js` loads
the other two.

To try out the demo, run a webserver in the papergui root folder, eg:

`python -m SimpleHTTPServer 8000`

then open http://localhost:8000/demo.html in a browser.

## TODO

- Improve documentation & demo
- Increase test coverage
- Add folders/tabs structure capability

## Known issues

- Select box change callback fires on controller creation (intended?)
