const main = document.querySelector("main.principal");
const table = document.createElement("table");

window.addEventListener("load", () => {
    const tableTHead = table.createTHead();
    const tableTHeadWithRow = tableTHead.insertRow();
    const div = document.createElement("div");

    window.api.readJSON().then((settingsJSON) => {
        const columnNames = settingsJSON.dbColumns;

        for(const columnName of Object.getOwnPropertyNames(columnNames)) {
            const th = document.createElement("th");
            th.textContent = columnName;
            tableTHeadWithRow.appendChild(th);
        }

        const tableTBody = table.createTBody();

        for(let i = 1; i <= 10; i++) {
            const tableTBodyWithRow = tableTBody.insertRow();

            for(let c = 1; c <= 6; c++) {
                const td = document.createElement("td");
                let index = c - 1;
                const tHeadName = tableTHeadWithRow.children[index];

                td.innerHTML = `linha <i>${i}</i> da coluna <strong>${tHeadName.innerText}</strong>`;

                tableTBodyWithRow.appendChild(td);
            }
        }

        div.className = "fundo-produtos";
        div.innerText = "fundo produtos";

        main.appendChild(table);
        main.appendChild(div);
    })
    .catch((error) => console.error("Erro ao ler o arquivo JSON: " + error));
});