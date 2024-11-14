const productButton = document.querySelector('.btn-products');
const productSection = document.querySelector('.product-container');

productButton.addEventListener("click", () => {
    productSection.innerHTML = '';

    window.api.getTableDB().then(tableSelected => {
        window.api.getColumnsDB().then(async columnsObject => {
            try {
                const columns = columnsObject.columnsDB;
                const columnsOrganized = columns.join(', ');
                const query = `SELECT ${columnsOrganized} FROM ${tableSelected}`;
                const tableElements = {
                    table: document.createElement("table"),
                    tHead: document.createElement("thead"),
                    tBody: document.createElement("tbody")
                }
                const tHeadRow = tableElements.tHead.insertRow();

                productButton.setAttribute("disabled", "");

                columnsObject.columnsPresentation.forEach(column => {
                    const th = document.createElement("th");
                    tHeadRow.appendChild(th).textContent = column;
                });
                table.appendChild(tHead);

                await window.api.executeQuery(query).then(rows => {
                    rows.forEach(row => {
                        const tBodyRow = tableElements.tBody.insertRow();

                        for(const column of columns) tBodyRow.insertCell().textContent = row[column];
                    });
                });

                table.appendChild(tBody);
                productSection.appendChild(table);
            } catch(error) {
                alert(error);
                console.error(error);

                productButton.removeAttribute("disabled", "");
            } finally {
                productButton.removeAttribute("disabled", "");
            }
        });
    });
});