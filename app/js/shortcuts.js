const keys = {};

document.addEventListener('keydown', event => {
    const eventKey = event.key;
    const eventCode = event.code;
    const ctrlPressed = keys['ControlLeft'] || keys['ControlRight'];

    keys[eventCode] = true;

    if(eventKey === 'F1') clickElement(".btn-products");

    if(eventKey === 'F2') clickElement(".btn-gerar-doc");

    if(eventKey === 'F3') {
        event.preventDefault();
        document.querySelector('.input-search').focus();
    }

    if(ctrlPressed && keys['Comma']) clickElement(".btn-settings");

    function clickElement(classElementName) {
        event.preventDefault();
        document.querySelector(classElementName).click();
    }
});
document.addEventListener('keyup', event => keys[event.code] = false);

inputSearch.addEventListener('keydown', event => { if(event.key === "Enter") btnSearch.click() });
inputSearch.addEventListener("keyup", (event) => (keys[event.code] = false));