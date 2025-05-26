const fs = require('fs');
const path = require('path');

describe('boundary', () => {
    let fileContent;

    beforeAll(() => {
        const filePath = path.resolve(__dirname, '../../../src/pages/AdminPage.js');
        fileContent = fs.readFileSync(filePath, 'utf8');
    });

    test('AdminPageComponent boundary should contain "Admin Panel" heading', () => {
        expect(fileContent).toMatch(/Admin Panel/);
    });

    test('AdminPageComponent boundary should contain "Users" heading', () => {
        expect(fileContent).toMatch(/Users/);
    });

    test('AdminPageComponent boundary should contain "Books" heading', () => {
        expect(fileContent).toMatch(/Books/);
    });

    test('AdminPageComponent boundary should contain "BookForm" component', () => {
        expect(fileContent).toMatch(/BookForm/);
    });

    test('AdminPageComponent boundary should contain "BookList" component', () => {
        expect(fileContent).toMatch(/BookList/);
    });
});
