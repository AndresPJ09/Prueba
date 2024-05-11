function save() {
    try {
        var productoData = {
            "nombreProducto": $("#nombre").val(),
            "descripcion": $("#descripcion").val(),
            "cantidad": $("#cantidad").val(),
            "precio": $("#precio").val(),
            "porcentajeIva": $("#iva").val(),
            "procentajeDescento": $("#descuento").val(),
            'state': parseInt($('#estado').val())
        };

        console.log(productoData);

        $.ajax({
            url: "http://localhost:9000/prueba/v1/api/productos",
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(productoData),
            success: function (data) {
                var id = data.id;
                console.log(data.data);

                Swal.fire({
                    title: '¡Guardado!',
                    text: 'Registro agregado con éxito',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    clearData();
                    loadData();
                });
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    title: '¡Error al guardar!',
                    text: 'No se pudo guardar el registro',
                    icon: 'error',
                    timer: 1500,
                    showConfirmButton: false
                });
            }
        });
    } catch (error) {
        console.error("Error obteniendo el producto:", error);
        Swal.fire({
            title: '¡Error interno!',
            text: 'Se produjo un error al procesar la solicitud',
            icon: 'error',
            timer: 1500,
            showConfirmButton: false
        });
    }
}



function loadData() {
    console.log("ejecutando loadData");
    var filterNombre = $('#filter_nombre').val().toLowerCase(); // convertir a minúsculas para la comparación
    var filterEstado = $('#filter_estado').val();

    $.ajax({
        url: "http://localhost:9000/prueba/v1/api/productos",
        method: "GET",
        data: {
            nombre: filterNombre,
            estado: filterEstado
        },
        dataType: "json",
        success: function (response) {
            console.log(response.data);
            var html = "";
            var data = response.data;
            data.forEach(function (item) {
                // Comprobación del estado con 'filterEstado'
                var itemStateMatch = filterEstado === "" || (filterEstado === "1" && item.state) || (filterEstado === "0" && !item.state);

                // Revisar si 'item.nombreProducto' existe y si se cumple la condición de filtrado
                if (!item.deletedAt && (filterNombre === "" || (item.nombreProducto && item.nombreProducto.toLowerCase().includes(filterNombre))) && itemStateMatch) {
                    html += `<tr>
                        <td>${item.nombreProducto}</td>
                        <td>${item.descripcion}</td>
                        <td>${item.cantidad}</td>
                        <td>${item.porcentajeIva}%</td>
                        <td>${item.procentajeDescento}%</td>
                        <td>${item.state ? "Activo" : "Inactivo"}</td>
                        <td>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="findById(${item.id})">
                                <img src="../icon/pencil-square.svg"></button>
                            <button type="button" class="btn btn-secondary" onclick="deleteById(${item.id})">
                                <img src="../icon/trash3.svg"></button>
                        </td>
                    </tr>`;
                }
            });
            $("#resultData").html(html);
        },
        error: function (error) {
            console.error("Error en la solicitud:", error);
        },
    });
}


function clearFilter() {
    $("#filter_nombre").val("");
    $("#filter_estado").val("");
    loadData();
}



function findById(id) {
    $.ajax({
        url: "http://localhost:9000/prueba/v1/api/productos/" + id,
        method: "GET",
        dataType: "json",
        success: function (response) {
            var data = response.data;
            $("#id").val(data.id);
            $("#nombre").val(data.nombreProducto);
            $("#descripcion").val(data.descripcion);
            $('#cantidad').val(data.cantidad);
            $('#precio').val(data.precio);
            $("#iva").val(data.porcentajeIva);
            $('#descuento').val(data.procentajeDescento);
            $("#estado").val(data.state == true ? 1 : 0);

            //Cambiar boton.
            var btnAgregar = $('button[name="btnAgregar"]');
            btnAgregar.text("Actualizar");
            btnAgregar.attr("onclick", "update()");
        },
        error: function (error) {
            // Función que se ejecuta si hay un error en la solicitud
            console.error("Error en la solicitud:", error);
        },
    });
}


function update() {
    // Construir el objeto data
    try {

        var data = {
            "nombreProducto": $("#nombre").val(),
            "descripcion": $("#descripcion").val(),
            "cantidad": $("#cantidad").val(),
            "precio": $("#precio").val(),
            "porcentajeIva": $("#iva").val(),
            "procentajeDescento": $("#descuento").val(),
            'state': parseInt($('#estado').val())
        };

        var id = $("#id").val();
        var jsonData = JSON.stringify(data);
        $.ajax({
            url: "http://localhost:9000/prueba/v1/api/productos/" + id,
            data: jsonData,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            success: function (result) {
                Swal.fire({
                    title: 'Actualizado!',
                    text: 'Registro actualizado con éxito',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false
                });
                loadData();
                clearData();

                // Actualizar botón
                var btnAgregar = $('button[name="btnAgregar"]');
                btnAgregar.text("Agregar");
                btnAgregar.attr("onclick", "save()");
            },
            error: function (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'No se pudo actualizar el registro',
                    icon: 'error',
                    timer: 1500,
                    showConfirmButton: false
                });
                console.error("Error en la solicitud:", error);
                loadData();
                clearData();
                var btnAgregar = $('button[name="btnAgregar"]');
                btnAgregar.text("Agregar");
                btnAgregar.attr("onclick", "save()");
            }
        });
    } catch (error) {
        Swal.fire({
            title: 'Error!',
            text: 'Error en actualizar producto.',
            icon: 'error',
            timer: 1500,
            showConfirmButton: false
        });
        console.error("Error en la solicitud:", error);
        loadData();
        clearData();
        var btnAgregar = $('button[name="btnAgregar"]');
        btnAgregar.text("Agregar");
        btnAgregar.attr("onclick", "save()");
    }
}


function deleteById(id) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "No podrás revertir esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: "http://localhost:9000/prueba/v1/api/productos/" + id,
                method: "delete",
                headers: {
                    "Content-Type": "application/json",
                }
            }).done(function (result) {
                Swal.fire({
                    title: 'Eliminado!',
                    text: 'El registro ha sido eliminado.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                });
                loadData();
            }).fail(function (error) {
                Swal.fire({
                    title: 'Error!',
                    text: 'No se pudo eliminar el registro: ' + error.statusText,
                    icon: 'error',
                    timer: 1500,
                    showConfirmButton: false,
                });
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            Swal.fire({
                title: 'Cancelado',
                text: 'La operación de eliminación ha sido cancelada',
                icon: 'error',
                timer: 1500,
                showConfirmButton: false,
            });
        }
    });
}

function clearData() {
    $("#id").val("");
    $("#nombre").val("");
    $("#descripcion").val("");
    $("#cantidad").val("");
    $("#precio").val("");
    $("#iva").val("");
    $("#descuento").val("");
    $("#estado").val("");
}
