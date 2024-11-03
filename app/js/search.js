document.addEventListener('keydown', function(event) {
    if (event.key === 'F1') {
        event.preventDefault(); 
        document.querySelector('.btn-cart').click(); 
    }
    if (event.key === 'F2') {
        event.preventDefault(); 
        document.querySelector('.btn-settings').click(); 
    }
});