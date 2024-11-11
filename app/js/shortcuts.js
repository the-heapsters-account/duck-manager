const keys = {};

document.addEventListener('keydown', event => {
    const eventKey = event.key;
    const eventCode = event.code;
    const ctrlPressed = keys['ControlLeft'] || keys['ControlRight'];

    keys[eventCode] = true;

    if(eventKey === 'F1') clickElement(".btn-products");

    if(eventKey === 'F2') clickElement(".btn-gerar-doc");

    if(ctrlPressed && keys['KeyI']) {
        event.preventDefault();
        document.querySelector('.input-search').focus();
    }

    if(ctrlPressed && keys['Comma']) clickElement(".btn-settings");

    function clickElement(classElementName) {
        event.preventDefault();
        document.querySelector(classElementName).click();
    }
});

document.addEventListener('keyup', event => {
    const eventCode = event.code;
    keys[eventCode] = false;
});