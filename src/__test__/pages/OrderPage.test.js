const fs = require('fs');
const path = require('path');

describe('boundary', () => {
    let fileContent;

    beforeAll(() => {
        const filePath = path.resolve(__dirname, '../../../src/pages/OrderPage.js');
        fileContent = fs.readFileSync(filePath, 'utf8');
    });

    test('OrderPageComponent boundary should contain "Orders" heading', () => {
        expect(fileContent).toMatch(/Orders/);
    });

    test('OrderPageComponent boundary should contain "OrderList" component', () => {
        expect(fileContent).toMatch(/OrderList/);
    });

    test('OrderPageComponent boundary should contain "OrderDetail" component, if it is selected to show details', () => {
        expect(fileContent).toMatch(/OrderDetail/);
    });
});
