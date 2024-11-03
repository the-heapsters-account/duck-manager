const productButton = document.querySelector('.btn-products');
const productSection = document.querySelector('.product-container');

productButton.addEventListener("click", () => {
    window.api.getConfigs().then(settings => {
        const tableName = settings.db_configs.table_name;

        try {
            window.api.executeQuery('SELECT * FROM ' + tableName).then(response => console.log(response));
        } catch(error) {
            alert(error);
            console.error(error);
        }
    });
});