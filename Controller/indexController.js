fs = require('fs');
const controller = {
    index : (req,res) => {
        console.log("renderizando al index");
        let archivoProductos = fs.readFileSync('productos.json', {enconding: 'utf-8'}); 
        let productos;
        if(archivoProductos == "")
        {
            console.log("lei un archivo vacio");
            productos=[];
        }
        else
        {
            console.log("Lei de un archivo que ya tiene algo");
            productos = JSON.parse(archivoProductos);
        }

        res.render('index', {'productos':productos});
    }
}





module.exports = controller;