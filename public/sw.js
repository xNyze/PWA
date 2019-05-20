self.addEventListener("install", function (event) {
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
        "/src/js/regSW.js",
        "/src/css/style.css",
        "/src/img/icon.ico",
        "/src/img/bowman.png",
        "/src/img/icon - 96x96.png",
        "/src/img/icon - 144x144.png",
        "/src/img/icon - 256x256.png",
        "/src/img/icon - 512x512.png",
        "/src/img/icon description.png",
        "/src/fonts/Bangers/bangers-regular-webfont.woff",
        "/src/fonts/Bangers/bangers-regular-webfont.woff2",
        "/src/fonts/Bangers/Bangers-Regular.ttf",
        "/src/fonts/Bangers/stylesheet.css",
        ""
      ]);
    }).catch((err) => { console.warn(err); })
  );
});

self.addEventListener("activate", function (event) {
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
      .catch((err) => {
        console.warn(err);
      })
  );
});
