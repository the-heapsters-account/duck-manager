const btnSearch = document.querySelector('.btn-search');
const inputSearch = document.querySelector('.input-search');

btnSearch.addEventListener('click', () => {
    productSection.innerHTML = '';
    const inputSearchValue = inputSearch.value;

    if(inputSearchValue.trim() === '') {
        alert('Por favor, preencha o campo de pesquisa corretamente');
        return;
    }

    window.api.getTableDB().then(table => {
        window.api.getColumnsDB().then(async columnsObject => {
            try {
                const columns = columnsObject.columnsDB;
                const columnsOrganized = columns.join(", ");
                const inputSearchValueTrimed = inputSearchValue.trimStart().trimEnd();
                const booleanQueryExpression = `UPPER('%${inputSearchValueTrimed}%') OR LOWER('%${inputSearchValueTrimed}%') OR '%${inputSearchValueTrimed}%'`;
                const query = `SELECT ${columnsOrganized} FROM ${table} WHERE nome LIKE ${booleanQueryExpression}`;
                const tableElements = {
                    table: document.createElement("table"),
                    tHead: document.createElement("thead"),
                    tBody: document.createElement("tbody")
                };
                const tHeadRow = tableElements.tHead.insertRow();
                console.log(query);
                btnSearch.setAttribute('disabled', '');
                inputSearch.setAttribute('disabled', '');

                columnsObject.columnsPresentation.forEach(column => {
                    const th = document.createElement("th");
                    tHeadRow.appendChild(th).textContent = column;
                });
                tableElements.table.appendChild(tableElements.tHead);

                await window.api.executeQuery(query).then(rows => {
                    rows.forEach(row => {
                        const tBodyRow = tableElements.tBody.insertRow();

                        for(const column of columns) tBodyRow.insertCell().textContent = row[column];
                    });
                });

                tableElements.table.appendChild(tableElements.tBody);
                productSection.appendChild(tableElements.table);
            } catch(error) {
                alert(error);
                console.log(error);

                btnSearch.removeAttribute("disabled", "");
                inputSearch.removeAttribute("disabled", "");
            } finally {
                btnSearch.removeAttribute("disabled", "");
                inputSearch.removeAttribute("disabled", "");
            }
        });
    });
});