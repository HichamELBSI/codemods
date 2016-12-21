jest.autoMockOff();
const defineTest = require('jscodeshift/dist/testUtils').defineTest;

defineTest(__dirname, 'replaceLegacyDecorators', null, 'replaceLegacyDecorators');
defineTest(__dirname, 'replaceLegacyDecorators', null, 'replaceLegacyDecoratorsWithOtherExport');
defineTest(__dirname, 'replaceLegacyDecorators', null, 'replaceLegacyDecoratorsWithRamda');