const fs = require('fs');
const path = require('path');

describe('boundary', () => {
    let fileContent;

    beforeAll(() => {
        const filePath = path.resolve(__dirname, '../../../../src/components/Admin Panel/AdminUserList.js');
        fileContent = fs.readFileSync(filePath, 'utf8');
    });

    test('AdminUserListComponent boundary should contain "Username"', () => {
        expect(fileContent).toMatch(/Username/);
    });

    test('AdminUserListComponent boundary should contain "Role"', () => {
        expect(fileContent).toMatch(/Role/);
    });
});
