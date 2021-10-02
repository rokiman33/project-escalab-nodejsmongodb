const Producto = require("../models/Producto");


exports.crearProducto = async (req, res) => {

    try {
        let producto;

        // Creamos nuestro producto
        producto = new Producto(req.body);

        await producto.save();
        res.send(producto);
        console.log('Metodo [POST]: ' + producto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.obtenerProductos = async (req, res) => {

    try {

        const productos = await Producto.find();
        res.json(productos)
        console.log('Metodo [GET]: ' + productos);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }

}

exports.actualizarProducto = async (req, res) => {

    try {
        const { nombre, categoria, ubicacion, precio } = req.body;
        let producto = await Producto.findById(req.params.id);

        if(!producto) {
            res.status(404).json({ msg: 'No existe el producto' })
        }

        producto.nombre = nombre;
        producto.categoria = categoria;
        producto.ubicacion = ubicacion;
        producto.precio = precio;

        producto = await Producto.findOneAndUpdate({ _id: req.params.id },producto, { new: true} )
        res.json(producto);
        console.log('Metodo [PUT]: ' + producto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}


exports.obtenerProducto = async (req, res) => {

    try {
        let producto = await Producto.findById(req.params.id);

        if(!producto) {
            res.status(404).json({ msg: 'No existe el producto' })
        }
       
        res.json(producto);
        console.log('Metodo [GET]: ' + producto);
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}

exports.eliminarProducto = async (req, res) => {

    try {
        let producto = await Producto.findById(req.params.id);

        if(!producto) {
            res.status(404).json({ msg: 'No existe el producto' })
        }
       
        await Producto.findOneAndRemove({ _id: req.params.id })
        res.json({ msg: 'Producto eliminado con exito' });
        console.log('Metodo [DELETE]: Producto eliminado con exito');
    } catch (error) {
        console.log(error);
        res.status(500).send('Hubo un error');
    }
}