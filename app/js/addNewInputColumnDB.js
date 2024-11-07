function addNewInputColumnDB(id, index) {
    const element = document.querySelector(id);
    const inputColumnElement = document.querySelectorAll(".add-new-input-column-db")[index];
    const li_clone = element.querySelectorAll("li")[0].cloneNode(true);

    li_clone.children[0].removeAttribute("value");
    li_clone.children[1].removeAttribute("value");

    element.insertBefore(li_clone, inputColumnElement.parentNode);
}