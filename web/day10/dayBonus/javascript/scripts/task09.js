// A small selector helper: $("p"), $(".class") and $("#id") all return matches.
function $(selector) {
  if (typeof selector !== 'string') throw new TypeError('The selector must be a string.');
  return document.querySelectorAll(selector);
}
window.$ = $;
