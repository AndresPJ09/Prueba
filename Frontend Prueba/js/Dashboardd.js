window.onload = function() {
    fetchMetrics();
};

function fetchMetrics() {
    fetch('http://localhost:9000/api/metrics')
    .then(response => response.json())
    .then(data => {
        document.getElementById('numClientes').innerText = data.numClientes;
        document.getElementById('numVentas').innerText = data.numVentas;
        document.getElementById('numProductos').innerText = data.numProductos;

        let tbody = document.getElementById('tablaMenorStock').getElementsByTagName('tbody')[0];
        tbody.innerHTML = ''; // Limpiar la tabla antes de agregar nuevos datos
        data.productosMenorStock.forEach(producto => {
            let row = tbody.insertRow();
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            cell1.textContent = producto.nombre;
            cell2.textContent = producto.stock;
        });
    })
    .catch(error => console.error('Error al cargar las métricas:', error));
}
