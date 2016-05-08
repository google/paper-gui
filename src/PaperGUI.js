/*!
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */
import ButtonPaperGUIController from './ButtonPaperGUIController';
import InputPaperGUIController from './InputPaperGUIController';
import SelectPaperGUIController from './SelectPaperGUIController';
import SliderPaperGUIController from './SliderPaperGUIController';
import TogglePaperGUIController from './TogglePaperGUIController';

export default class PaperGUI {
  constructor() {
    this.rootEl_ = document.createElement('paper-gui');
    this.controllers_ = [];

    // Use the 'h' key to toggle the gui completely.
    document.body.addEventListener('keydown', evt => {
      if (evt.target == document.body && (evt.which || evt.keyCode) == 72) {
        this.rootEl_.hidden = !this.rootEl_.hidden;
      }
    });
    return this;
  }

  add(object, propName) {
    var args = [];
    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }
    let controller = this._controllerFactory(object, propName, args);
    this._append(controller.getElement());
    if (!this.rootEl_.isAttached) {
      document.body.appendChild(this.rootEl_);
    }
    this.controllers_.push(controller);
    return controller;
  }

  open() {
    this.rootEl_.open();
  }

  close() {
    this.rootEl_.close();
  }

  hide() {
    this.rootEl_.hidden = true;
  }

  show() {
    this.rootEl_.hidden = false;
  }

  _controllerFactory(object, propName, args) {
    switch(typeof object[propName]) {
      case 'function':
        return new ButtonPaperGUIController(object, propName, args);
      case 'boolean':
        return new TogglePaperGUIController(object, propName, args);
      case 'string':
        if (typeof args[2] == 'object') {
          // A list of possible values are provided, create a selector.
          return new SelectPaperGUIController(object, propName, args);
        }
        return new InputPaperGUIController(object, propName, args);
      case 'number':
        if (typeof args[2] == 'object') {
          // A list of possible values are provided, create a selector.
          return new SelectPaperGUIController(object, propName, args);
        }
        return new SliderPaperGUIController(object, propName, args);
      default:
        throw new TypeError('Property type not supported yet');
        break;
    }
  }

  _append(el) {
  	this.rootEl_.appendController(el);
  }
}

// Make PaperGUI global to avoid obfuscation.
window.PaperGUI = PaperGUI;
