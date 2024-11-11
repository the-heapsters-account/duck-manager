const productButton = document.querySelector('.btn-products');
const productSection = document.querySelector('.product-container');

productButton.addEventListener("click", () => {
    productSection.innerHTML = '';

    window.api.getTableDB().then(tableSelected => {
        window.api.getColumnsDB().then(columnsObject => {
            try {
                const columns = columnsObject.columnsDB
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

                window.api.executeQuery(query).then(queryResults => {
                    queryResults.forEach(queryResult => {
                        const tBodyRow = tBody.insertRow();

                        tBodyRow.insertCell().textContent = queryResult.codigo;
                        tBodyRow.insertCell().textContent = queryResult.referencia;
                        tBodyRow.insertCell().textContent = queryResult.codigo_barras;
                        tBodyRow.insertCell().textContent = queryResult.nome;
                        tBodyRow.insertCell().textContent = `R$${queryResult.preco_venda.toString().padStart(2, "0")},00`;
                        tBodyRow.insertCell().textContent = queryResult.estoque;
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