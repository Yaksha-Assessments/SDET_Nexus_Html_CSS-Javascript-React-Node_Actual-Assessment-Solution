const fs = require('fs');
const path = require('path');

describe('boundary', () => {
    let fileContent;

    beforeAll(() => {
        const filePath = path.resolve(__dirname, '../../../../src/components/Common/Navbar.js');
        fileContent = fs.readFileSync(filePath, 'utf8');
    });

    test('NavbarComponent boundary should contain "Online Bookstore" link', () => {
        expect(fileContent).toMatch(/Online Bookstore/);
    });

    test('NavbarComponent boundary should contain "Home" link', () => {
        expect(fileContent).toMatch(/Home/);
    });

    test('NavbarComponent boundary should contain "Cart" link for non-admin users', () => {
        expect(fileContent).toMatch(/Cart/);
    });

    test('NavbarComponent boundary should contain "Admin Panel" link for admin users', () => {
        expect(fileContent).toMatch(/Admin Panel/);
    });

    test('NavbarComponent boundary should contain "Orders" link for admin users', () => {
        expect(fileContent).toMatch(/Orders/);
    });

    test('NavbarComponent boundary should contain "Login" link if anyone is not logged in', () => {
        expect(fileContent).toMatch(/Login/);
    });

    test('NavbarComponent boundary should contain "Logout" button for logged in profiles', () => {
        expect(fileContent).toMatch(/Logout/);
    });
});
