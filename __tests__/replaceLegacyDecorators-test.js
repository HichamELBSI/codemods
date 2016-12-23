jest.autoMockOff();
const defineTest = require('jscodeshift/dist/testUtils').defineTest;

defineTest(__dirname, 'replaceLegacyDecorators', null, 'replaceLegacyDecorators');
defineTest(__dirname, 'replaceLegacyDecorators', null, 'replaceLegacyDecoratorsWithOtherExport');
defineTest(__dirname, 'replaceLegacyDecorators', null, 'replaceLegacyDecoratorsWithRamda');
defineTest(__dirname, 'replaceLegacyDecorators', null, 'replaceLegacyDecoratorsWithFlow');
defineTest(__dirname, 'replaceLegacyDecorators', null, 'replaceLegacyDecoratorsWithoutExportedDefaultClass');
// defineTest(__dirname, 'replaceLegacyDecorators', null, 'replaceLegacyDecoratorsWithoutDecorator');
