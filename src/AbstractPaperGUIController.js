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
export default class AbstractPaperGUIController {
	constructor(object, propertyName, opt_args) {
    if (this.constructor === AbstractPaperGUIController) {
        throw new TypeError('Abstract class "AbstractPaperGUIController" cannot be instantiated directly.');
    }
    this.createElement_(object, propertyName, opt_args);
    this.name(propertyName);
    this.changeCallback_ = new Function();
	}

  getElement() {
    return this.el_;
  }

  createElement_(object, propertyName, opt_args) {
    throw new Error('Abstract method createElement_ not implemented!');
  }

  name() {
    throw new Error('Abstract method name not implemented!');
  }

  onChange(callback) {
    this.changeCallback_ = callback;
    return this;
  }
}
