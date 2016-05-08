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

export default class ButtonPaperGUIController extends AbstractPaperGUIController {
  constructor(object, propertyName) {
    if (typeof object[propertyName] !== 'function') {
      throw new TypeError('Invalid property type, expecting a function.');
    }
    super(object, propertyName);
  }

  createElement_(object, propertyName) {
    if (this.el_) {
      return;
    }
    this.el_ = document.createElement('paper-button');
    this.el_.raised = true;
    this.el_.addEventListener('click', object[propertyName]);
  }

  name(label) {
    if (this.el_) {
      Polymer.dom(this.el_).innerHTML = label;
    }
    return this;
  }

  onChange() {
    throw new Error('onChange is not available for a Function-type property');
  }
}
