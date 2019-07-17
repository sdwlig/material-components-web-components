const drawer = document.getElementsByTagName('mwc-drawer')[0];
const container = drawer.parentNode;
container.addEventListener('nav', (e) => {
  drawer.open = !drawer.open;
});
