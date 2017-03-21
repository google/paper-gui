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
!function(){function e(e){return document.querySelector('script[src$="paperGUI.js"]').src.replace("paperGUI.js",e)}function n(){if(!window.PaperGUI){window.Polymer=window.Polymer||{},window.Polymer.dom="shadow";var n=document.createElement("link");n.rel="import",n.href=e("paper-gui.html"),n.onload=function(){document.dispatchEvent(new CustomEvent("PaperGUIReady",{bubbles:!0}))},document.head.appendChild(n)}}var t="registerElement"in document&&"import"in document.createElement("link")&&"content"in document.createElement("template");if(t)n();else{var o=document.createElement("script");o.src=e("webcomponents-lite.min.js"),o.onload=n(),document.head.appendChild(o)}}();