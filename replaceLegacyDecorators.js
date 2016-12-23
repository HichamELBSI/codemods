function transformer(file, api) {
    const j = api.jscodeshift;

    const root = j(file.source);

    let decorators;
    let exportedClassIdentifier;
    let unExportedClassIdentifier;
    let exportDeclaration;
    let enhanceDeclaration;
    let unexportedClassDeclaration;
    let classDeclaration;

    const exportedDecoratedClass = root.find(j.ExportDefaultDeclaration, {
      declaration: {
        type: 'ClassDeclaration',
        decorators: (decorators) => decorators && decorators.length > 0
      },
    });
    const decoratedClass = root.find(j.ClassDeclaration, {
      type: 'ClassDeclaration',
      decorators: (decorators) => decorators && decorators.length > 0
    });
    const isDecoratedClassDefaultExported = decoratedClass.size() > 0
    && root.find(j.ExportDefaultDeclaration, {
      declaration: {
        type: 'ClassDeclaration',
      },
    });

    const isDecoratedAndNotExported = decoratedClass.size() === 1 && isDecoratedClassDefaultExported.size() === 0;
    const isDecorated = exportedDecoratedClass.size() === 1;

    if (isDecoratedAndNotExported) {
        decoratedClass.replaceWith(e => {
            unexportedClassDeclaration = e.value;
            decorators = unexportedClassDeclaration.decorators;
            unexportedClassDeclaration.decorators = [];
            unExportedClassIdentifier = unexportedClassDeclaration.id;

            return unexportedClassDeclaration;
        });
    }

    if (exportedDecoratedClass.size() === 1) {
        exportedDecoratedClass.replaceWith(e => {
            classDeclaration = e.value.declaration;
            decorators = classDeclaration.decorators;
            classDeclaration.decorators = [];
            exportedClassIdentifier = classDeclaration.id;

            return classDeclaration;
        });
    }

    if (isDecoratedAndNotExported || isDecorated) {
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

        enhanceDeclaration = j.variableDeclaration(
          'const',
          [j.variableDeclarator(
            j.identifier('enhance'),
            j.callExpression(
              j.memberExpression(
                j.identifier('R'),
                j.identifier('pipe'),
              ),
              decorators.reverse(),
            ),
          )],
        );
    }

    if (isDecoratedAndNotExported) {
        let enhanceExportDeclaration = root.find(j.ExportDefaultDeclaration, {
            declaration: {
                type: 'Identifier',
                name: unExportedClassIdentifier.name,
            },
        });

        enhanceExportDeclaration.remove();

        const newEnhanceExportDeclaration = j.exportDefaultDeclaration(
            j.callExpression(
                j.identifier('enhance'),
                [unExportedClassIdentifier],
            ),
        );

        root.nodes()[0].program.body.push(enhanceDeclaration);
        root.nodes()[0].program.body.push(newEnhanceExportDeclaration);
    }

    if (exportedDecoratedClass.size() === 1) {

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

module.exports = transformer;
module.exports.parser = 'flow';
