module.exports.logMessage = function errorMessage(messageNotOk, messageOk, error) {
    if(error) {
        console.error(messageNotOk);
    } else {
        console.log(messageOk)
    }
};