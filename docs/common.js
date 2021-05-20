function extractValue(pageLength, max, min) {
    return Math.random() * ((pageLength - max) - min) + min;
}
