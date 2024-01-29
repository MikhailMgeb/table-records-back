function byField(fieldName) {
    return (a, b) => a[fieldName] < b[fieldName] ? 1 : -1;
}

module.exports = byField;