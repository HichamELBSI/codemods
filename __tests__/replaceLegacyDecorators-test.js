jest.autoMockOff();
const defineTest = require('jscodeshift/dist/testUtils').defineTest;

defineTest(__dirname, 'replaceLegacyDecorators', null, 'replaceLegacyDecorators');