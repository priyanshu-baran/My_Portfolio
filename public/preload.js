// Starts downloading the landing page's key images while the JS bundle is still
// downloading. Keep this list in sync with TIER1 in src/landingAssets.js.
(function () {
  if (window.location.pathname !== '/') return;
  var small = window.matchMedia('(max-width: 800px)').matches;
  var tier1 = [
    'background',
    'fog_7',
    'mountain_10',
    'fog_6',
    'mountain_9',
    'mountain_8',
    'fog_5',
    'mountain_7',
  ];
  function add(fmt) {
    tier1.forEach(function (n, i) {
      var l = document.createElement('link');
      l.rel = 'preload';
      l.as = 'image';
      l.href = '/img/' + n + (small ? '-sm' : '') + '.' + fmt;
      document.head.appendChild(l);
    });
  }
  var probe = new Image();
  probe.onload = function () {
    add(probe.width > 0 ? 'avif' : 'webp');
  };
  probe.onerror = function () {
    add('webp');
  };
  probe.src =
    'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADrbWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAAAAAAAOcGl0bQAAAAAAAQAAAB5pbG9jAAAAAEQAAAEAAQAAAAEAAAETAAAAFgAAAChpaW5mAAAAAAABAAAAGmluZmUCAAAAAAEAAGF2MDFDb2xvcgAAAABqaXBycAAAAEtpcGNvAAAAFGlzcGUAAAAAAAAAAgAAAAIAAAAQcGl4aQAAAAADCAgIAAAADGF2MUOBAAwAAAAAE2NvbHJuY2x4AAEADQAGgAAAABdpcG1hAAAAAAAAAAEAAQQBAoMEAAAAHm1kYXQSAAoFGAA2BCAyCxsAGmmmhAAAq1nM';
})();
