(function () {
  var path = window.location.pathname;
  var links = document.querySelectorAll('[data-nav]');

  links.forEach(function (link) {
    var href = link.getAttribute('href');
    if (!href) return;
    if (href !== '/' && path.startsWith(href)) {
      link.classList.add('active');
    }
    if (href === '/' && path === '/') {
      link.classList.add('active');
    }
  });

  var yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
