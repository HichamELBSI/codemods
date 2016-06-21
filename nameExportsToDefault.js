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

  const exportsToAddToDefault = [];

  return j(file.source)
    .find(j.ExportNamedDeclaration)
    .replaceWith(e => {
        // const myFunc = () => {};
        const declaration = e.value.declaration;
        j(declaration).find(j.VariableDeclarator).forEach(decl => {
            console.log(decl)
        });
        return declaration;
    })
    .toSource();
};