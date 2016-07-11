/**
 * Transform all named exports to a default one, at the end of the file
 * Transforms:
 * export const myFunc = () => {};
 *
 * into:
 * const myFunc = () => {};
 *
 * export default {
 *  myFunc,
 * };
 */

module.exports = function (file, api) {
  const j = api.jscodeshift;

  const root = j(file.source);

  const exportsToAddToDefault = [];

  // Replace the named exports by simple declarations
  root.find(j.ExportNamedDeclaration)
    .replaceWith(e => {
        // const myFunc = () => {};
        const declaration = e.value.declaration;
        // We assume there's only declation per export
        exportsToAddToDefault.push(declaration.declarations[0].id.name);
        return declaration;
    });

  const exportedProperties = exportsToAddToDefault
    .map(exportName => j.property(
      'init',
      j.identifier(exportName),
      j.identifier(exportName)
    ));

  for (let i = 0; i < exportedProperties.length; i++) {
    exportedProperties[i].shorthand = true;
  }

  // Check if there's already an exportDefaultDeclaration
  const defaultDeclaration = root.find(j.ExportDefaultDeclaration);
  if (defaultDeclaration.size()) {
    defaultDeclaration.replaceWith(p => {
      const value = p.value;
      value.declaration.properties = [
        ...value.declaration.properties,
        ...exportedProperties,
      ];
      return value;
    })
  } else {
    const defaultExport = j.exportDefaultDeclaration(
      j.objectExpression(exportedProperties)
    );

    // This work. But it's obviously ugly
    root.nodes()[0].program.body.push(defaultExport);
  }

  return root
    .toSource({
      trailingComma: true,
    });
};
