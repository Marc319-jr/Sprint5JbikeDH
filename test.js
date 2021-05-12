const fs = require('fs');
const path = require('path');
const file = path.resolve(__dirname, './data/', 'test.JSON');


console.log("Escribiendo en un archivo");
fs.writeFileSync(file , "Hola mundo");
console.log("Escribi");