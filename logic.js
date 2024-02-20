var categorias = [];
var productos = [];
var imagenes = [];

function agregarCategoria() {
    var nombreCategoria = document.getElementById('nombreCategoria').value;
    if (nombreCategoria.trim() !== '') {
        var nuevaCategoria = {
            id: categorias.length + 1,
            nombre: nombreCategoria
        };

        categorias.push(nuevaCategoria);
        console.log(categorias);
        document.getElementById('nombreCategoria').value = '';
    } else {
        alert('Por favor, ingrese un nombre de categoría.');
    }
    actualizarSelect();
}

function actualizarSelect() {
    var selectCategorias = document.getElementById('categoriaProducto');
    selectCategorias.innerHTML = '';
    for (var i = 0; i < categorias.length; i++) {
        var opcion = document.createElement('option');
        opcion.value = categorias[i].id;
        opcion.text = categorias[i].nombre;
        selectCategorias.add(opcion);
    }
}

function agregarProducto() {
    var nombreProducto = document.getElementById('nombreProducto').value;
    var precioProducto = document.getElementById('precioProducto').value;
    var descripcionProducto = document.getElementById('descripcionProducto').value;
    var categoriaProducto = document.getElementById('categoriaProducto').value;
    var imagenInput = document.getElementById('imagenInput');

    if (nombreProducto.trim() !== '' && categoriaProducto !== '' && imagenInput !== '') {
        var nuevoProducto = {
            id: productos.length + 1,
            nombre: nombreProducto.trim(),
            precio: precioProducto.trim(),
            descripcion: descripcionProducto.trim(),
            categoria: categoriaProducto,
            imagen: imagenes.length + 1
        };
        var imagenUrl = URL.createObjectURL(imagenInput.files[0]);
        var nuevaImagen = {
            id: imagenes.length + 1,
            url: imagenUrl,
            idCategoria: categoriaProducto
        };

        imagenes.push(nuevaImagen);
        console.log(imagenes);
        productos.push(nuevoProducto);
        console.log(productos);

        document.getElementById('nombreProducto').value = '';
        document.getElementById('precioProducto').value = '';
        document.getElementById('descripcionProducto').value = '';

    }

}
