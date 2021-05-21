const pageWidth = document.body.clientWidth;
const pageHeight = document.body.clientHeight;


function extractValue(pageLength, max, min) {
    return Math.random() * ((pageLength - max) - min) + min;
}
function extractRadius(x, y) {
    return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
}
function createDirection() {
    const value = Math.random() - Math.random();
    if(value < 0) {
        return -1;
    } else {
        return 1;
    }
}
