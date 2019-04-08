self.addEventListener('install', function(){
    console.log('SW Installed');
    event.waitUntil(caches.open('static').then(function(cache) {
        cache.addAll([
            '/',
            '/index.html',
            '/src/js/',
            '/src/css/style.css',
            '/src/img/icon.ico',
        ]);
    }););
    
});

self.addEventListener('activate', function(){
    console.log('SW Activated');
});