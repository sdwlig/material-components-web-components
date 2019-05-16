export const isScrollable = el => el ? el.scrollHeight > el.offsetHeight : false;

export const areTopsMisaligned = els => {
  var tops = new Set();
  [].forEach.call(els, function (el) { return tops.add(el.offsetTop); });

  return tops.size > 1;
}
