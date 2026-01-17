const fs = require('fs');
const path = require('path');

const indexHtmlPath = path.resolve(__dirname, '..', 'build/client/index.html');
let file = fs.readFileSync(indexHtmlPath).toString();
file = file.replace('<head>', '<head><base href="https://galczo5.github.io/music-theory-app/" />');

fs.writeFileSync(indexHtmlPath, file);
