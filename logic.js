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

        var tablaCategorias = document.getElementById('categorias').getElementsByTagName('tbody')[0];
        var filacategoria = tablaCategorias.insertRow(tablaCategorias.length);
        celdaID = filacategoria.insertCell(0);
        celdaNombre = filacategoria.insertCell(1);
        celdaAcciones = filacategoria.insertCell(2).innerHTML = `<input class="btn btn-warning" type="button" onClick="EditarCategoria(this)" value="Editar" >
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

    if (nombreProducto.trim() !== '' && categoriaProducto !== '' && precioProducto !== '' && imagenInput.files.length > 0) {
        var nuevoProducto = {
            id: productos.length + 1,
            nombre: nombreProducto.trim(),
            precio: precioProducto.trim(),
            descripcion: descripcionProducto.trim(),
            categoria: categoriaProducto,
            imagen: imagenes.length + 1
        };
        productos.push(nuevoProducto);

        var tablaProductos = document.getElementById('tabla_productos').getElementsByTagName('tbody')[0];
        var fila = tablaProductos.insertRow(tablaProductos.length);
        celdaNombre = fila.insertCell(0);
        celdaPrecio = fila.insertCell(1);
        celdaDescripcion = fila.insertCell(2);
        celdaCategoria = fila.insertCell(3);
        celdaImagen = fila.insertCell(4);
        celdaAcciones = fila.insertCell(5).innerHTML = `<input class="btn btn-warning" type="button" onClick="Editar(this)" value="Editar" >
                                            <input class="btn btn-danger" type="button" onClick="Borrar(this)" value="Borrar" >
                                            <input class="btn btn-info" type="button" onClick="Mostrar(this)" value="Mostrar" >`

        celdaNombre.innerText = nuevoProducto.nombre;
        celdaPrecio.innerText = nuevoProducto.precio;
        // Para la descripción, solo mostramos un fragmento
        celdaDescripcion.innerText = descripcionProducto.substring(0, 20) + '...';
        celdaCategoria.innerText = nuevoProducto.categoria;

        var imagen = document.createElement('img');
        imagen.src = URL.createObjectURL(imagenInput.files[0]);
        imagen.style.maxWidth = '100px';
        imagen.style.height = 'auto';
        celdaImagen.appendChild(imagen);

        var nuevaImagen = {
            id: imagenes.length + 1,
            url: imagen.src,
            idCategoria: categoriaProducto
        };
        imagenes.push(nuevaImagen);

        actualizarSelect();
        VaciarCampos();
    }
    else {
        alert('Por favor, complete todos los campos requeridos.');
    }
}

function Mostrar(button) {
    var fila = button.closest('tr');
    var descripcionCell = fila.cells[2];
    var precioCell = fila.cells[1];
    var categoriaCell = fila.cells[3];
    var imagenCell = fila.cells[4];

    if (descripcionCell.classList.contains('mostrado')) {
        // Si ya está mostrado, lo ocultamos
        descripcionCell.classList.remove('mostrado');
        precioCell.style.display = 'none';
        categoriaCell.style.display = 'none';
        imagenCell.style.display = 'none';

        descripcionCell.innerText = productos[fila.rowIndex - 1].descripcion.substring(0, 1) + '...';
    } else {
        // Si está oculto, lo mostramos completamente
        descripcionCell.classList.add('mostrado');
        precioCell.style.display = '';
        categoriaCell.style.display = '';
        imagenCell.style.display = '';

        descripcionCell.innerText = productos[fila.rowIndex - 1].descripcion;
    }
}


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
    fila.cells[2].innerHTML = descripcionProducto.substring(0, 20) + '...'
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
