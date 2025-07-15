const fs = require('fs');
const path = require('path');

describe('boundary', () => {
    let fileContent;

    beforeAll(() => {
        const filePath = path.resolve(__dirname, '../../../src/pages/LoginPage.js');
        fileContent = fs.readFileSync(filePath, 'utf8');
    });

    test('LoginPageComponent boundary should contain "Login" heading', () => {
        expect(fileContent).toMatch(/Login/);
    });

    test('LoginPageComponent boundary should contain "Username" field', () => {
        expect(fileContent).toMatch(/Username/);
    });

    test('LoginPageComponent boundary should contain "Password" field', () => {
        expect(fileContent).toMatch(/Password/);
    });

    test('LoginPageComponent boundary should contain "Login" button', () => {
        expect(fileContent).toMatch(/Login/);
    });
});
