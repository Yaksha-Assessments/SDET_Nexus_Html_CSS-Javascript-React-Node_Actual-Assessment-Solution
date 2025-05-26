const fs = require('fs');
const path = require('path');

describe('boundary', () => {
    let fileContent;

    beforeAll(() => {
        const filePath = path.resolve(__dirname, '../../../../src/components/Order/OrderList.js');
        fileContent = fs.readFileSync(filePath, 'utf8');
    });

    test('OrderListComponent boundary should contain "Total" label for total data', () => {
        expect(fileContent).toMatch(/Total/);
    });

    test('OrderListComponent boundary should contain "Status" for status data', () => {
        expect(fileContent).toMatch(/Status/);
    });

    test('OrderListComponent boundary should contain "User ID" label for user id data', () => {
        expect(fileContent).toMatch(/User ID/);
    });

    test('OrderListComponent boundary should contain "Order ID" label for order id data', () => {
        expect(fileContent).toMatch(/Order ID/);
    });

    test('OrderListComponent boundary should contain "Order List" heading', () => {
        expect(fileContent).toMatch(/Order List/);
    });
});
