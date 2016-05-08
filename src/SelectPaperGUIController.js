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
import AbstractPaperGUIController from './AbstractPaperGUIController';

export default class SelectPaperGUIController
    extends AbstractPaperGUIController {
  constructor(object, propertyName, args) {
    // Supported arguments: valueList {Array|Object}.

    if (typeof object[propertyName] !== 'string' &&
        typeof object[propertyName] !== 'number') {
      throw new TypeError('Invalid property type for property '+ propertyName
          + ', expecting a string or a number.');
    }
    if (typeof args[2] !== 'object') {
      throw new TypeError('Invalid values list for property '+ propertyName
          +', expecting an object.');
    }
    super(object, propertyName, args);
  }

  createElement_(object, propertyName, args) {
    if (this.el_) {
      return;
    }
    this.el_ = document.createElement('paper-dropdown-menu');
    let listEl = document.createElement('paper-listbox');
    listEl.classList.add('dropdown-content');

    // Create the actual contents of the dropdown.
    var valuesList = args[2];
    var values = [];
    var labels = [];
    for (let i in valuesList) {
      values.push(valuesList[i]);
      let itemEl = document.createElement('paper-item');
      Polymer.dom(itemEl).value = valuesList[i];
      Polymer.dom(itemEl).innerHTML = isFinite(i) ? valuesList[i] : i;
      Polymer.dom(listEl).appendChild(itemEl);
    }
    listEl.select(values.indexOf(object[propertyName]));
    Polymer.dom(this.el_).appendChild(listEl);
    this.el_.addEventListener('iron-select', evt => {
      var selectedValue = Polymer.dom(this.el_.selectedItem).value;
      object[propertyName] = selectedValue;
      this.changeCallback_(selectedValue);
    });
  }

  name(label) {
    this.el_.label = label;
    return this;
  }
}
