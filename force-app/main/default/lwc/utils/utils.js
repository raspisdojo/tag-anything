const isNullOrWhiteSpace = (string_value) => {
    return !string_value || string_value.length === 0 || /^\s*$/.test(string_value);
};

const deleteWhiteSpaces = (string_value) => {
    return string_value.replace(/ /g, '');
};

export { isNullOrWhiteSpace, deleteWhiteSpaces };
