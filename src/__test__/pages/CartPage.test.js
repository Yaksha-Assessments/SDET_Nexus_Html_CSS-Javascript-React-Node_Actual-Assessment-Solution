const fs = require('fs');
const path = require('path');

describe('boundary', () => {
    let fileContent;

    beforeAll(() => {
        const filePath = path.resolve(__dirname, '../../../src/pages/CartPage.js');
        fileContent = fs.readFileSync(filePath, 'utf8');
    });

    test('CartPageComponent boundary should contain "Your Cart" heading', () => {
        expect(fileContent).toMatch(/Your Cart/);
    });

    test('CartPageComponent boundary should contain "Total" heading', () => {
        expect(fileContent).toMatch(/Total/);
    });

    test('CartPageComponent boundary should contain "Place Order" button', () => {
        expect(fileContent).toMatch(/Place Order/);
    });

    test('CartPageComponent boundary should contain "Loading..." if user is not authenticated', () => {
        expect(fileContent).toMatch(/Loading.../);
    });

    test('CartPageComponent boundary should contain "No items in the cart" if cart is empty', () => {
        expect(fileContent).toMatch(/No items in the cart/);
    });
});
