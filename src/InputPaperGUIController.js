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

export default class InputPaperGUIController extends AbstractPaperGUIController {
  constructor(object, propertyName) {
    if (typeof object[propertyName] !== 'string') {
      throw new TypeError('Invalid property type, expecting a string.');
    }
    super(object, propertyName);
  }

  createElement_(object, propertyName) {
    if (this.el_) {
      return;
    }
    this.el_ = document.createElement('paper-input');
    this.el_.value = object[propertyName];
    this.el_.label = propertyName;
    this.el_.addEventListener('change', evt => {
      object[propertyName] = evt.target.value;
      this.changeCallback_(evt.target.value);
    });
  }

  name(label) {
    if (this.el_) {
      this.el_.label = label;
    }
    return this;
  }
}
