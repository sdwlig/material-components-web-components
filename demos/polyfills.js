var polyfills = [
  "Array.prototype.entries",
  "Array.prototype.find",
  "Array.prototype.includes",
  "Array.prototype.filter",
  "Array.prototype.forEach",
  "Array.prototype.reduce",
  "Array.prototype.map",
  "CustomEvent",
  "Array.prototype.values",
  "Array.prototype.every",
  "Array.isArray",
  "Array.of",
  "Array.from",
  "Element",
  "Element.prototype.matches",
  "Event",
  "MutationObserver",
  "Promise",
  "Promise.prototype.finally",
  "String.prototype.includes",
  "Set",
  "String.prototype.startsWith",
  "String.prototype.trim",
  "console.error",
  "console.log",
  "console.info",
  "console.warn",
  "console.trace",
  "fetch",
  "Element.prototype.classList",
  "Element.prototype.append",
  "Element.prototype.prepend",
  "Element.prototype.remove",
  "Element.prototype.toggleAttribute",
  "Element.prototype.replaceWith",
  "Element.prototype.closest",
  "Element.prototype.cloneNode",
  "Element.prototype.before",
  "Element.prototype.after",
  "Element.prototype.placeholder",
  "Element.prototype.dataset",
  "JSON",
  "Node.prototype.contains",
  "NodeList.prototype.forEach",
  "Number.isInteger",
  "Number.isNaN",
  "Object.assign",
  "Object.entries",
  "Object.freeze",
  "Object.values",
];
var embed = function(where, name, url) {
  var script = document.createElement('script');
  script.onload = function() {
    console.log(name, "loaded and ready");
    alert(name + ' loaded and ready');
  };
  script.src = url;
  where.appendChild(script);
}

var doc_head = document.getElementsByTagName('head')[0];
embed(doc_head, 'polyfills', 'https://polyfill.io/v3/polyfill.min.js?flags=gated' + polyfills.join('%2C'));
embed(doc_head, 'css variables', 'https://unpkg.com/css-vars-ponyfill@2/dist/css-vars-ponyfill.min.js')

