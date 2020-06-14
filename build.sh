rm -rf build

cp -r front build
cd build
brotli -Z api.js
brotli -Z index.html
brotli -Z main.css
cd c
brotli nav.js
brotli playlist.js
brotli result.js
cd ../..