var categorias = [];
var productos = [];
var imagenes = [];

function agregarCategoria() {

    var nombreCategoria = document.getElementById('nombreCategoria').value;
    var nuevaCategoria = {
        id: categorias.length + 1,
        nombre: nombreCategoria
    };
    categorias.push(nuevaCategoria);


    ////////////PARTE DE MARCO///////////////
    var tablaCategorias = document.getElementById('categorias').getElementsByTagName('tbody')[0];
    var filacategoria = tablaCategorias.insertRow(tablaCategorias.length);
    celdaID = filacategoria.insertCell(0);
    celdaNombre = filacategoria.insertCell(1);
    celdaAcciones = filacategoria.insertCell(2).innerHTML = `<input class="submit" type="button" onClick="EditarCategoria(this)" value="Editar" >
                                                <input class="submit" type="button" onClick="BorrarCategoria(this)" value="Borrar" >`

    celdaID.innerText = nuevaCategoria.id;
    celdaNombre.innerText = nuevaCategoria.nombre;

    ////////////////////////////////////////////


    document.getElementById('nombreCategoria').value = '';
    actualizarSelect()

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


    var nuevoProducto = {
        id: productos.length + 1,
        nombre: nombreProducto.trim(),
        precio: precioProducto.trim(),
        descripcion: descripcionProducto.trim(),
        categoria: categoriaProducto,
        imagen: imagenes.length + 1
    };
    productos.push(nuevoProducto);

    ////////////////PARTE DE MARCO/////////////////////

    var tablaProductos = document.getElementById('tabla_productos').getElementsByTagName('tbody')[0];
    var fila = tablaProductos.insertRow(tablaProductos.length);
    celdaNombre = fila.insertCell(0);
    celdaPrecio = fila.insertCell(1);
    celdaDescripcion = fila.insertCell(2);
    celdaCategoria = fila.insertCell(3);
    celdaImagen = fila.insertCell(4);
    celdaAcciones = fila.insertCell(5).innerHTML = `<input class="submit" type="button" onClick="Editar(this)" value="Editar" >
                                                <input class="submit" type="button" onClick="Borrar(this)" value="Borrar" >
                                                <input class="submit" type="button" onClick="Mostrar(this)" value="Mostrar" >`

    celdaNombre.innerText = nuevoProducto.nombre;
    celdaPrecio.innerText = nuevoProducto.precio;
    celdaDescripcion.innerText = nuevoProducto.descripcion;
    celdaCategoria.innerText = nuevoProducto.categoria;

    var imagen = document.createElement('img');
    imagen.src = URL.createObjectURL(imagenInput.files[0]);
    imagen.style.maxWidth = '100px';
    imagen.style.height = 'auto';
    celdaImagen.appendChild(imagen);
    ////////////////////////////////////////////////////////////////


    var nuevaImagen = {
        id: imagenes.length + 1,
        url: imagen.src,
        idCategoria: categoriaProducto
    };
    imagenes.push(nuevaImagen);




    VaciarCampos();


}

////////////////PARTE DE MARCO/////////////////////
function VaciarCampos() {
    document.getElementById("nombreProducto").value = ""
    document.getElementById("descripcionProducto").value = ""
    document.getElementById("categoriaProducto").value = ""
    document.getElementById("precioProducto").value = ""
    document.getElementById("imagenInput").value = ""
}
function Editar(td) {
    fila = td.parentElement.parentElement
    document.getElementById("nombreProducto").value = fila.cells[0].innerHTML
    document.getElementById("precioProducto").value = fila.cells[1].innerHTML
    document.getElementById("descripcionProducto").value = fila.cells[2].innerHTML
    document.getElementById("categoriaProducto").value = fila.cells[3].innerHTML
    document.getElementById("imagenInput").value = fila.cells[4].innerHTML
}
function EditarCategoria(td) {
    filacategoria = td.parentElement.parentElement
    document.getElementById("nombreCategoria").value = filacategoria.cells[1].innerHTML
}
function Actualizar() {
    var nombreProducto = document.getElementById('nombreProducto').value;
    var precioProducto = document.getElementById('precioProducto').value;
    var descripcionProducto = document.getElementById('descripcionProducto').value;
    var categoriaProducto = document.getElementById('categoriaProducto').value;
    var imagenInput = document.getElementById('imagenInput');

    fila.cells[0].innerHTML = nombreProducto
    fila.cells[1].innerHTML = precioProducto
    fila.cells[2].innerHTML = descripcionProducto
    fila.cells[3].innerHTML = categoriaProducto

    let imgElement = document.createElement('img');
    imgElement.src = URL.createObjectURL(imagenInput.files[0]);
    imgElement.style.maxWidth = '100px';
    imgElement.style.height = 'auto';
    fila.cells[4].innerHTML = "";
    fila.cells[4].appendChild(imgElement);
    VaciarCampos();

}
function ActualizarCategoria() {
    var nombreCategoria = document.getElementById('nombreCategoria').value;
    filacategoria.cells[1].innerHTML = nombreCategoria
    document.getElementById('nombreCategoria').value = '';
}
////////////////////////////////////////////////////////////////
