const productButton = document.querySelector('.btn-products');
const productSection = document.querySelector('.product-container');

productButton.addEventListener("click", () => {
    productSection.innerHTML = '';

    window.api.getTableDB().then(tableSelected => {
        window.api.getColumnsDB().then(columnsObject => {
            try {
                const columns = columnsObject.columnsDB;
                const columnsOrganized = columns.join(', ');
                const query = `SELECT ${columnsOrganized} FROM ${tableSelected}`;

                const table = document.createElement("table");
                const tHead = document.createElement("thead");
                const tBody = document.createElement("tbody");
                const tHeadRow = tHead.insertRow();

                columnsObject.columnsPresentation.forEach(column => {
                    const th = document.createElement("th");
                    tHeadRow.appendChild(th).textContent = column;
                });
                table.appendChild(tHead);

                window.api.executeQuery(query).then(rows => {
                    rows.forEach(row => {
                        const tBodyRow = tBody.insertRow();
                        tBodyRow.insertCell().textContent = row.codigo;
                        tBodyRow.insertCell().textContent = row.referencia;
                        tBodyRow.insertCell().textContent = row.codigo_barras;
                        tBodyRow.insertCell().textContent = row.nome;
                        tBodyRow.insertCell().textContent = `R$${row.preco_venda.toFixed(2).replace('.', ',')}`;
                        tBodyRow.insertCell().textContent = row.estoque;
                    });
                });

                table.appendChild(tBody);
                productSection.appendChild(table);
            } catch(error) {
                alert(error);
                console.error(error);
            }
        });
    });
});