function save() {

    try {

        var clienteData = {
            "tipoIdentificacion": $("#tipo_identificacion").val(),
            "identificacion": $("#identificacion").val(),
            "nombre_cliente": $("#nombre").val(),
            "apellido_cliente": $("#aprellido").val(),
            "telefono": $("#telefono").val(),
            "direccion": $("#direccion").val() + ' No ' + $("#numeral").val() + ' - ' + $("#numeral2").val() + ' - ' + $("#description").val(),
            "ciudad": $("#ciudad").val(),
            'state': parseInt($('#estado').val())
        };

        console.log(clienteData);

        $.ajax({
            url: "http://localhost:9000/prueba/v1/api/clientes",
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(clienteData),
            success: function (data) {
                var id = data.id;
                console.log(data.data);

                alert("Registro agregado con éxito");
                clearData();
                loadData();
            },
            error: function (error) {
                alert(`El cliente con identificación: ${$("#document").val()} ya existe`);
            },
        });
    } catch (error) {
        console.error("Error obteniendo el cliente:", error);
    }
}


function loadTiposIdentificacion() {
    $.ajax({
        url: "http://localhost:9000/prueba/v1/api/enum/tipoidentificacion",
        method: "GET",
        dataType: "json",
        success: function (response) {
            console.log(response);
            var html = '<option value="">Seleccionar Tipo de Documento</option>'; // Opción predeterminada
            response.forEach(function (item) {
                // Construir el HTML para cada objeto
                html += `<option value="${item}">${item}</option>`;
            });
            $("#tipo_identificacion").html(html);
        },
        error: function (error) {
            // Función que se ejecuta si hay un error en la solicitud
            console.error("Error en la solicitud:", error);
        },
    });
}


function loadDireccion() {
    $.ajax({
        url: "http://localhost:9000/prueba/v1/api/enum/direccion",
        method: "GET",
        dataType: "json",
        success: function (response) {
            console.log(response);
            var html = "";
            response.forEach(function (item) {
                // Construir el HTML para cada objeto
                html += `<option value="${item}">${item}</option>`;
            });
            $("#direccion").html(html);
        },
        error: function (error) {
            // Función que se ejecuta si hay un error en la solicitud
            console.error("Error en la solicitud:", error);
        },
    });
}


function loadData() {
    
    console.log("ejecutando loadData");
    $.ajax({
        url: "http://localhost:9000/prueba/v1/api/clientes",
        method: "GET",
        dataType: "json",
        success: function (response) {
            console.log(response.data);
            var html = "";
            var data = response.data;
            data.forEach(function (item) {
                // Construir el HTML para cada objeto
                if (!item.deletedAt) { // Verificar si el campo deletedAt es nulo (no eliminado lógicamente)

                    html +=
                        `<tr>
                    <td>${item.tipoIdentificacion}</td>
                    <td>` + item.identificacion + `</td>
                    <td>` + item.nombre_cliente + `</td>
                    <td>` + item.apellido_cliente + `</td>
                    <td>` + item.telefono + `</td>
                    <td>` + item.direccion + `</td>
                    <td>` + item.ciudad + `</td>
                    <td>` + (item.state == true ? "Activo" : "Inactivo") + `</td>
                    <td> <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop" onclick="findById(${item.id})"> <img src="../assets/icon/pencil-square.svg" > </button>
                    <button type="button" class="btn btn-secundary" onclick="deleteById(${item.id})"> <img src="../assets/icon/trash3.svg" > </button></td>
                </tr>`;

                };
            });

            $("#resultData").html(html);
        },
        error: function (error) {
            // Función que se ejecuta si hay un error en la solicitud
            console.error("Error en la solicitud:", error);
        },
    });
}


function findById(id) {
    $.ajax({
        url: "http://localhost:9000/prueba/v1/api/clientes/" + id,
        method: "GET",
        dataType: "json",
        success: function (response) {
            var data = response.data;
            $("#id").val(data.id);
            $("#tipo_identificacion").val(data.tipoIdentificacion);
            $("#identificacion").val(data.identificacion);
            $('#nombre').val(data.nombre_cliente);
            $('#aprellido').val(data.apellido_cliente);
            $("#telefono").val(data.telefono);
            $("#direccion").val(data.direccion);
            $('#ciudad').val(data.ciudad);
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
            "tipoIdentificacion": $("#tipo_identificacion").val(),
            "identificacion": $("#identificacion").val(),
            "nombre_cliente": $("#nombre").val(),
            "apellido_cliente": $("#aprellido").val(),
            "telefono": $("#telefono").val(),
            "direccion": $("#direccion").val() + ' No ' + $("#numeral").val() + ' - ' + $("#numeral2").val() + ' - ' + $("#description").val(),
            "ciudad": $("#ciudad").val(),
            'state': parseInt($('#estado').val())
        };

        var id = $("#id").val();
        var jsonData = JSON.stringify(data);
        $.ajax({
            url: "http://localhost:9000/prueba/v1/api/clientes/" + id,
            data: jsonData,
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
        }).done(function (result) {
            alert("Registro actualizado con éxito");
            loadData();
            clearData();

            //actualzar boton
            var btnAgregar = $('button[name="btnAgregar"]');
            btnAgregar.text("Agregar");
            btnAgregar.attr("onclick", "save()");
        });
    } catch (error) {
        alert("Error en actualizar clientes.");
        console.error("Error en la solicitud:", error);
        //actualzar boton
        loadData();
        clearData();
        var btnAgregar = $('button[name="btnAgregar"]');
        btnAgregar.text("Agregar");
        btnAgregar.attr("onclick", "save()");
    }
}


function deleteById(id) {
    // Mostrar una alerta de confirmación antes de proceder
    if (confirm("¿Estás seguro de que quieres eliminar este registro?")) {
        $.ajax({
            url: "http://localhost:9000/prueba/v1/api/clientes/" + id,
            method: "delete",
            headers: {
                "Content-Type": "application/json",
            },
        }).done(function (result) {
            alert("Registro eliminado con éxito");
            loadData(); // Asegúrate de que esta función actualiza correctamente los datos en tu vista
        }).fail(function (error) {
            alert("Error al eliminar el registro: " + error.statusText); // Manejo de error
        });
    } else {
        // Si el usuario cancela, simplemente retornamos sin hacer nada
        console.log("Operación cancelada por el usuario.");
    }
}

function clearData() {
    $("#id").val("");
    $("#tipo_identificacion").val("");
    $("#identificacion").val("");
    $("#nombre").val("");
    $("#apellido").val("");
    $("#telefono").val("");
    $("#direccion").val("");
    $("#ciudad").val("");
    $("#estado").val("");
}


