var categorias = [];
var productos = [];
var imagenes = [];
var idProductos = 0;
var idCategorias = 0;
var idImagenes = 0;

function agregarCategoria() {
    var nombreCategoria = document.getElementById('nombreCategoria').value;
    if (nombreCategoria.trim() !== '') {
        var nuevaCategoria = {
            id: ++idCategorias,
            nombre: nombreCategoria
        };
        categorias.push(nuevaCategoria);
        console.log(categorias)

        var tablaCategorias = document.getElementById('categorias').getElementsByTagName('tbody')[0];
        var filacategoria = tablaCategorias.insertRow(tablaCategorias.length);
        celdaID = filacategoria.insertCell(0);
        celdaNombre = filacategoria.insertCell(1);
        celdaAcciones = filacategoria.insertCell(2).innerHTML = `<input class="btn btn-warning" type="button" onClick="EditarCategoria(${categorias.length - 1}, this)" value="Editar" >
                                            <input class="btn btn-danger" type="button" onClick="BorrarCategoria(this)" value="Borrar" >`

        celdaID.innerText = nuevaCategoria.id;
        celdaNombre.innerText = nuevaCategoria.nombre;

        document.getElementById('nombreCategoria').value = '';

        actualizarSelect()
    } else {
        alert('Por favor, ingrese un nombre de categoría.');
    }
}

function actualizarSelect() {
    var selectCategorias = document.getElementById('categoriaProducto');
    selectCategorias.innerHTML = '';
    for (var i = 0; i < categorias.length; i++) {
        var opcion = document.createElement('option');
        opcion.value = categorias[i].nombre;
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

    if (nombreProducto.trim() !== '' && categoriaProducto !== '' && precioProducto !== '' && imagenInput.files.length > 0) {
        var nuevoProducto = {
            id: ++idProductos,
            nombre: nombreProducto.trim(),
            precio: precioProducto.trim(),
            descripcion: descripcionProducto.trim(),
            categoria: categoriaProducto,
            imagen: ++idImagenes
        };
        productos.push(nuevoProducto);
        console.log(productos);

        var tablaProductos = document.getElementById('tabla_productos').getElementsByTagName('tbody')[0];
        var fila = tablaProductos.insertRow(tablaProductos.length);
        celdaID = fila.insertCell(0);
        celdaNombre = fila.insertCell(1);
        celdaPrecio = fila.insertCell(2);
        celdaCategoria = fila.insertCell(3);
        celdaAcciones = fila.insertCell(4).innerHTML = `<input class="btn btn-warning" type="button" onClick="Editar(${productos.length - 1}, this)" value="Editar" >
                                            <input class="btn btn-danger" type="button" onClick="Borrar(this)" value="Borrar" >
                                            <input class="btn btn-info" type="button" onclick="abrirVentana(${productos.length - 1})" value="Mostrar" >`
                                            
        var indice = productos.length - 1;
        productoN = productos[indice]
        celdaID.innerText = productoN.id;
        celdaNombre.innerText = productoN.nombre;
        celdaPrecio.innerText = productoN.precio;
        celdaCategoria.innerText = productoN.categoria;

        var imagen = document.createElement('img');
        imagen.src = URL.createObjectURL(imagenInput.files[0]);
        imagen.style.maxWidth = '100px';
        imagen.style.height = 'auto';
        var nuevaImagen = {
            id: idImagenes,
            url: imagen.src,
            idCategoria: categoriaProducto
        };
        imagenes.push(nuevaImagen);
        console.log(imagenes);

        actualizarSelect();
        VaciarCampos();
    }
    else {
        alert('Por favor, complete todos los campos requeridos.');
    }
}

function abrirVentana(indice) {

    var producto = productos[indice];
    var imagen = imagenes[indice];

    let imgElement = document.createElement('img');
    imgElement.src = imagen.url;
    imgElement.style.maxWidth = '100px';
    imgElement.style.height = 'auto';

    $('#ventanaEmergenteLabel').text(producto.nombre);
    $('#contenidoVentana').html(`<p>Precio: ${producto.precio}</p> <p>Descripción: ${producto.descripcion}</p> <p>Categoria: ${producto.categoria}</p>`);
    $('#contenidoVentana').append(imgElement);

    $('#ventanaEmergente').modal('show');
}

function VaciarCampos() {
    document.getElementById("nombreProducto").value = ""
    document.getElementById("descripcionProducto").value = ""
    document.getElementById("categoriaProducto").value = ""
    document.getElementById("precioProducto").value = ""
    document.getElementById("imagenInput").value = ""
}

/////////PRODUCTOS//////////////
function Editar(indice, td) {
    producto = productos[indice]
    document.getElementById("nombreProducto").value = producto.nombre
    document.getElementById("precioProducto").value = producto.precio
    document.getElementById("descripcionProducto").value = producto.descripcion
    document.getElementById("categoriaProducto").value = producto.categoria
    document.getElementById("imagenInput").value = ""

    fila = td.parentElement.parentElement
    document.getElementById("nombreProducto").value = fila.cells[1].innerHTML
    document.getElementById("precioProducto").value = fila.cells[2].innerHTML
    document.getElementById("categoriaProducto").value = fila.cells[3].innerHTML
}
function Actualizar(indice) {
    producto = productos[indice]
    imagen = imagenes[indice];

    var nombreProducto = document.getElementById('nombreProducto').value;
    var precioProducto = document.getElementById('precioProducto').value;
    var categoriaProducto = document.getElementById('categoriaProducto').value;
    var descripcionProducto = document.getElementById('descripcionProducto').value;
    var imagenInput = document.getElementById('imagenInput');


    fila.cells[1].innerHTML = nombreProducto
    fila.cells[2].innerHTML = precioProducto
    fila.cells[3].innerHTML = categoriaProducto



    producto.nombre = nombreProducto;
    producto.precio = precioProducto;
    producto.descripcion = descripcionProducto;
    producto.categoria = categoriaProducto;

    var imagennueva = document.createElement('img');
    imagennueva.src = URL.createObjectURL(imagenInput.files[0]);
    imagen.url = "";
    imagen.url = imagennueva.src;



    actualizarSelect();

    VaciarCampos();
}
//////////////////////////////////




//////////CATEGORIAS/////////
function EditarCategoria(indice, td) {
    categoria = categorias[indice]
    document.getElementById("nombreCategoria").value = categoria.nombre

    filacategoria = td.parentElement.parentElement
    document.getElementById("nombreCategoria").value = filacategoria.cells[1].innerHTML

}

function ActualizarSelectCategoria(indice) {
    categoria = categorias[indice];
    var nombreCategoria = document.getElementById('nombreCategoria').value;
    categoria.nombre = nombreCategoria;
    filacategoria.cells[1].innerHTML = nombreCategoria
    document.getElementById('nombreCategoria').value = '';
    actualizarSelect();
}
////////////////////////////////////





function Borrar(button) {
    var fila = button.closest('tr');
    var index = fila.rowIndex - 1;
    productos.splice(index, 1);
    fila.remove();
}

function BorrarCategoria(button) {
    var fila = button.closest('tr');
    var index = fila.rowIndex - 1;
    var categoriaID = categorias[index].id;

    productos = productos.filter(producto => producto.categoria !== categoriaID);

    categorias.splice(index, 1);

    fila.remove();
    actualizarSelect();

    var tablaProductos = document.getElementById('tabla_productos').getElementsByTagName('tbody')[0];
    for (var i = tablaProductos.rows.length - 1; i >= 0; i--) {
        if (tablaProductos.rows[i].cells[3].innerText === categoriaID.toString()) {
            tablaProductos.deleteRow(i);
        }
    }
}
