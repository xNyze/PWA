self.addEventListener("install", function () {
  console.log("SW Installed");
  event.waitUntil(
    caches.open("static").then(function (cache) {
      cache.addAll([
        "/",
        "/index.html",
        "/src/js/controller.js",
        "/src/js/model.js",
        "/src/js/view.js",
        "/src/js/vexflow-min.js",
        "/src/css/style.css",
        "/src/img/icon.ico",
        "/src/fonts/Bangers/",
        "https://fonts.googleapis.com/css?family=Patrick+Hand"
      ]);
    })
  );
});

self.addEventListener("activate", function () {
  console.log("SW Activated");
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (res) {
      if (res) {
        return res;
      } else {
        return fetch(event.request);
      }
    })
  );
});
