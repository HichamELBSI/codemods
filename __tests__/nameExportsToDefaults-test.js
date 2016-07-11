jest.autoMockOff();
const defineTest = require('jscodeshift/dist/testUtils').defineTest;

defineTest(__dirname, 'nameExportsToDefault', null, 'nameExportsToDefault');
defineTest(__dirname, 'nameExportsToDefault', null, 'nameExportsToDefault.withDefault');