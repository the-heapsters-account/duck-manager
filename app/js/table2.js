const main = document.querySelector("main.principal");
const productList = document.querySelector(".product-container");

window.addEventListener("load", () => {
    window.api.readJSON().then((settingsJSON) => {
        const columnNames = settingsJSON.dbColumns;
        const produtos = []; // Array para armazenar os produtos

        for (let i = 1; i <= 10; i++) {
            const produto = {};
            columnNames.forEach((columnName) => {
                produto[columnName] = `linha ${i} da coluna ${columnName}`;
            });
            produtos.push(produto); // Adiciona o produto ao array
        }

        // Função para exibir os produtos
        function displayProducts(products) {
            productList.innerHTML = ""; // Limpa o container de produtos
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

        // Cria e adiciona o seletor de colunas
        const searchInput = document.querySelector("#pesquisa");
        const columnSelect = document.createElement("select");
        columnSelect.id = "column-select";

        // Adiciona uma opção "Todos" para buscar em todas as colunas
        const allOption = document.createElement("option");
        allOption.value = "all";
        allOption.textContent = "Todos";
        columnSelect.appendChild(allOption);

        // Adiciona uma opção para cada coluna
        columnNames.forEach(columnName => {
            const option = document.createElement("option");
            option.value = columnName;
            option.textContent = columnName;
            columnSelect.appendChild(option);
        });

        // Adiciona o select ao DOM, próximo ao campo de busca
        searchInput.parentNode.insertBefore(columnSelect, searchInput.nextSibling);

        // Adiciona evento de busca
        searchInput.addEventListener("input", () => filterProducts());
        columnSelect.addEventListener("change", () => filterProducts());

        // Função de filtro
        function filterProducts() {
            const searchValue = searchInput.value.toLowerCase();
            const selectedColumn = columnSelect.value;

            const filteredProducts = produtos.filter(produto => {
                if (selectedColumn === "all") {
                    return Object.values(produto).some(value =>
                        value.toLowerCase().includes(searchValue)
                    );
                } else {
                    return produto[selectedColumn].toLowerCase().includes(searchValue);
                }
            });
            displayProducts(filteredProducts);
        }
        displayProducts(produtos); // Exibe todos os produtos inicialmente
    }).catch((error) => console.error("Erro ao ler o arquivo JSON: " + error));
});