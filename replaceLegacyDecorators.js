module.exports = function (file, api) {
    const j = api.jscodeshift;

    const root = j(file.source);

    return root
        .toSource({
            trailingComma: true,
        });
};
