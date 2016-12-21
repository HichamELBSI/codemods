module.exports = function (file, api) {
    const j = api.jscodeshift;

    const root = j(file.source);

    let decorators;
    let exportedClassIdentifier;

    const exportedDecoratedClass = root.find(j.ExportDefaultDeclaration, {
        declaration: {
            type: 'ClassDeclaration',
            decorators: (decorators) => Boolean(decorators)
        },
    });

    // Replace decorated export default with simple class declaration
    if (exportedDecoratedClass.size() === 1) {
        exportedDecoratedClass.replaceWith(e => {
            const classDeclaration = e.value.declaration;
            decorators = classDeclaration.decorators;
            classDeclaration.decorators = [];
            exportedClassIdentifier = classDeclaration.id;
        
            return classDeclaration;
        });

        const imports = root.find(j.ImportDeclaration, {
            source: {
                value: 'ramda',
            }
        });

        if(imports.size() === 0) {
            const ramdaImportDeclaration = j.importDeclaration(
                [j.importDefaultSpecifier(j.identifier('R'))],
                j.stringLiteral('ramda'),
            );

            root.find(j.ImportDeclaration).at(0).insertBefore(
                ramdaImportDeclaration,
            );
        }
        
        const enhanceDeclaration = j.variableDeclaration(
            'const',
            [j.variableDeclarator(
                j.identifier('enhance'),
                j.callExpression(
                    j.memberExpression(
                        j.identifier('R'),
                        j.identifier('pipe'),
                    ),
                    decorators.reverse().map(decorator => decorator.expression),
                ),
            )],
        );
        const exportDeclaration = j.exportDefaultDeclaration(
            j.callExpression(
                j.identifier('enhance'),
                [exportedClassIdentifier],
            ),
        );

        root.nodes()[0].program.body.push(enhanceDeclaration);
        root.nodes()[0].program.body.push(exportDeclaration);
    }

    return root
        .toSource({
            trailingComma: true,
            quote: 'single'
        });
};
