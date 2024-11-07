const main = document.querySelector("main.principal");
const productList = document.querySelector(".product-container");

window.addEventListener("load", () => {
    window.api.getConfigs().then((settingsJSON) => {
        const columnNames = settingsJSON.dbColumns;
        const produtos = []; // Array para armazenar os produtos

        for(let i = 1; i <= 10; i++) {
            const produto = {};
            columnNames.forEach(columnName => {
                produto[columnName] = `linha ${i} da coluna ${columnName}`;
            });

            produtos.push(produto); // Adiciona o produto ao array
        }

        function displayProducts(products) {
            productList.innerHTML = "";
            const table = document.createElement("table");
            const thead = document.createElement("thead");
            const headerRow = document.createElement("tr");

            // Adiciona os cabeçalhos da tabela
            columnNames.forEach((columnName) => {
                const th = document.createElement("th");
                th.textContent = columnName;
                headerRow.appendChild(th);
            });

            thead.appendChild(headerRow);
            table.appendChild(thead);

            const tbody = document.createElement("tbody");
            products.forEach(produto => {
                const row = document.createElement("tr");
                columnNames.forEach((columnName) => {
                    const td = document.createElement("td");
                    td.textContent = produto[columnName];
                    row.appendChild(td);
                });
                tbody.appendChild(row);
            });

            table.appendChild(tbody);
            productList.appendChild(table);
        }

        // Adiciona evento de busca
        const searchInput = document.querySelector(".input-search");
        searchInput.addEventListener("click", () => {
            const searchValue = searchInput.value.toLowerCase();
            const filteredProducts = produtos.filter(produto =>
                Object.values(produto).some(value =>
                    value.toLowerCase().includes(searchValue)
                )
            );

            displayProducts(filteredProducts);
        });
    }).catch((error) => console.error("Erro ao ler o arquivo JSON: " + error));
});