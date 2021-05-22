const path = require('path');
const fs = require ('fs');
const file = path.resolve(__dirname, '../data/', 'productos.JSON');
const controller = {
    product: (req,res) => {
        console.log("renderizando al producto: ");
        let archivoProductos = fs.readFileSync(file, {enconding: 'utf-8'}); 
        let productos;
        if(archivoProductos == "")
        {
            productos=[];
        }
        else
        {
            productos = JSON.parse(archivoProductos);
        }
        let id = req.query.productID;
        console.log(id)
        let productsend = productos[id-1];
        res.render('./products/product', {'product':productsend});
    },

    crear: (req,res) => {
        console.log("renderizando a la creacion del producto");
        res.render('./products/crear');

    },

    carrito: (req,res) => {
        console.log("renderizando al carrito");
        res.render('./products/carrito' , {'user' : req.session.userLogged});
    },

    guardar:(req,res) => {
        console.log("creando un producto");
        let archivoProductos = fs.readFileSync(file, {enconding: 'utf-8'});
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
        console.log("el archivo contiene lo siguiente");
        console.log(productos);
        let producto = {
            id: productos.length+1,
            marca: req.body.marcaProducto,
            modelo: req.body.modeloProducto,
            desc1: req.body.desc1,
            desc2: req.body.desc2,
            imagen: req.file ? req.file.filename : '',
            rodados: req.body.rodadosProducto.split(','),
            colores: req.body.coloresProducto.split(','),
            stock: req.body.stockProducto,
            precio: req.body.precioProducto,
            descuento: req.body.descuentoProducto,
            cuotas: req.body.cuotasProducto
        }
        console.log(producto);
        productos.push(producto);
        console.log("genero un nuevo producto a la lista");
        let productosJSON = JSON.stringify(productos);
        fs.writeFileSync(file, productosJSON);
        res.redirect("/");
    },
    edit:(req,res) => {
        console.log("Editando un producto");
        let id = req.params.id;
        let archivoProductos = fs.readFileSync(file, {enconding: 'utf-8'}); 
        let productos;
        if(archivoProductos == "")
        {
            productos=[];
        }
        else
        {
            productos = JSON.parse(archivoProductos);
        }
        let producto = productos[id-1];
        console.log("El producto a editar es: ");
        console.log(producto);
        res.render('./products/edit', {'product' : producto});
    },
    update: (req,res) => {
        
        let archivoProductos = fs.readFileSync(file, {enconding: 'utf-8'}); 
        let productos;
        if(archivoProductos == "")
        {
            productos=[];
        }
        else
        {
            productos = JSON.parse(archivoProductos);
        }
        console.log("La edicion que llego:");
        console.log(req.body);
        let id = req.params.id;
        let posicion = id -1;
        productos[posicion].marca = req.body.marcaProducto;
        productos[posicion].modelo = req.body.modeloProducto;
        productos[posicion].desc1 = req.body.desc1;
        productos[posicion].desc2 = req.body.desc2;
        productos[posicion].imagen = req.file ? req.file.filename : '';
        productos[posicion].rodados = req.body.rodadosProducto.split(',');
        productos[posicion].colores = req.body.coloresProducto.split(',');
        productos[posicion].stock = req.body.stockProducto;
        productos[posicion].precio = req.body.precioProducto;
        productos[posicion].descuento = req.body.descuentoProducto,
        productos[posicion].cuotas = req.body.cuotasProducto
        console.log("prodcuto editado: ");
        console.log(productos[posicion]);
        let productosJSON = JSON.stringify(productos);
        fs.writeFileSync(file, productosJSON);
        res.redirect("/");
    },
    delete: (req,res) => {
        console.log("Este es el delete del producot: "+ req.params.id);
        let archivoProductos = fs.readFileSync(file, {enconding: 'utf-8'}); 
        let productos;
        if(archivoProductos == "")
        {
            productos=[];
        }
        else
        {
            productos = JSON.parse(archivoProductos);
        }
        let productsDelete = [];
        for(let i = 0; i< productos.length ;i++)
        {
            if(productos[i].id == req.params.id)
            {
                productsDelete.push(productos.pop());
            }
        }
        console.log(productsDelete);
        console.log(productos);
        for(let i = 0;i<productos.length;i++)
        {
            productos[i].id = i+1;
        }
        console.log(productsDelete);
        let productosJSON = JSON.stringify(productos);
        fs.writeFileSync(file, productosJSON);
        res.redirect("/");



    }


}


module.exports = controller;