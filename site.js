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
