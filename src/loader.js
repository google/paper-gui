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

/** This code loads the webComponents polyfill if necessary, then asynchronously loads PaperGUI and its dependencies. */

(function() {

function samePathAsMe(fileName) {
  return document.querySelector('script[src$="paperGUI.js"]').src.replace('paperGUI.js', fileName);
}

// Conditionally load webcomponents polyfill.
// Credit: Glen Maddern (geelen on GitHub)
var webComponentsSupported = ('registerElement' in document
    && 'import' in document.createElement('link')
    && 'content' in document.createElement('template'));

if (!webComponentsSupported) {
  var wcPoly = document.createElement('script');
  wcPoly.src = samePathAsMe('webcomponents-lite.min.js');
  wcPoly.onload = lazyLoadElements();
  document.head.appendChild(wcPoly);
} else {
  lazyLoadElements();
}

function lazyLoadElements () {
  if (window.PaperGUI) {
    return;
  }
  window.Polymer = window.Polymer || {};
  window.Polymer.dom = 'shadow';
  var elImport = document.createElement('link');
  elImport.rel = 'import';
  elImport.href = samePathAsMe('paper-gui.html');
  elImport.onload = function() {
    document.dispatchEvent(new CustomEvent("PaperGUIReady", { bubbles: true }));
  };
  document.head.appendChild(elImport);
}

})();
