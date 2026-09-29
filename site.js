// Research cards: open one panel at a time
document.querySelectorAll('.research-card').forEach(function (card) {
  card.addEventListener('click', function () {
    var wasOpen = card.getAttribute('aria-expanded') === 'true';
    document.querySelectorAll('.research-card').forEach(function (c) {
      c.setAttribute('aria-expanded', 'false');
      document.getElementById(c.getAttribute('aria-controls')).hidden = true;
    });
    if (!wasOpen) {
      card.setAttribute('aria-expanded', 'true');
      document.getElementById(card.getAttribute('aria-controls')).hidden = false;
    }
  });
});
// Mobile menu
var toggle = document.querySelector('.nav-toggle');
if (toggle) {
var links = document.getElementById('nav-links');
toggle.addEventListener('click', function () {
  var open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', open);
});
links.querySelectorAll('a').forEach(function (a) {
  a.addEventListener('click', function () { links.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); });
});
}

// Poster lightbox: image poster links open over the page (blurred, greyed background)
(function () {
  var imageLink = /\.(png|jpe?g|webp|gif)$/i;
  var links = Array.prototype.filter.call(document.querySelectorAll('a.pub-tag'), function (a) {
    return imageLink.test(a.getAttribute('href').split(/[?#]/)[0]);
  });
  if (!links.length) return;

  var overlay = document.createElement('div');
  overlay.className = 'lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Poster');
  overlay.hidden = true;
  overlay.innerHTML =
    '<button class="lightbox-close" type="button" aria-label="Close poster">&times;</button>' +
    '<figure class="lightbox-figure">' +
      '<p class="lightbox-loading">Loading poster…</p>' +
      '<img class="lightbox-img" alt="">' +
      '<figcaption><a class="lightbox-full" href="#" target="_blank" rel="noopener">Open full size</a></figcaption>' +
    '</figure>';
  document.body.appendChild(overlay);

  var img = overlay.querySelector('.lightbox-img');
  var loading = overlay.querySelector('.lightbox-loading');
  var full = overlay.querySelector('.lightbox-full');
  var closeBtn = overlay.querySelector('.lightbox-close');
  var lastLink = null;

  function open(link) {
    lastLink = link;
    var title = link.closest('li') && link.closest('li').querySelector('.pub-title');
    img.alt = 'Poster: ' + (title ? title.textContent.trim() : 'poster');
    img.classList.remove('is-loaded');
    loading.hidden = false;
    img.onload = function () { loading.hidden = true; img.classList.add('is-loaded'); };
    img.onerror = function () { loading.textContent = 'The poster couldn’t load.'; };
    img.src = link.href;
    full.href = link.href;
    overlay.hidden = false;
    document.documentElement.classList.add('lightbox-open');
    requestAnimationFrame(function () { overlay.classList.add('is-visible'); });
    closeBtn.focus();
  }

  function close() {
    overlay.classList.remove('is-visible');
    document.documentElement.classList.remove('lightbox-open');
    setTimeout(function () { overlay.hidden = true; img.removeAttribute('src'); loading.textContent = 'Loading poster…'; }, 200);
    if (lastLink) lastLink.focus();
  }

  links.forEach(function (a) {
    a.addEventListener('click', function (e) {
      // Let Ctrl/Cmd-click or middle-click still open the image in a new tab
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      open(a);
    });
  });
  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', function (e) { if (e.target === overlay || e.target.classList.contains('lightbox-figure')) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !overlay.hidden) close(); });
})();
