const fs = require('fs');
const path = require('path');

describe('boundary', () => {
    let fileContent;

    beforeAll(() => {
        const filePath = path.resolve(__dirname, '../../../../src/components/Book/BookList.js');
        fileContent = fs.readFileSync(filePath, 'utf8');
    });

    test('BookListComponent boundary should contain "Add to Cart" button', () => {
        expect(fileContent).toMatch(/Add to Cart/);
    });

    test('BookListComponent boundary should contain "View Details" button', () => {
        expect(fileContent).toMatch(/View Details/);
    });

    test('BookListComponent boundary should contain "Delete" button', () => {
        expect(fileContent).toMatch(/Delete/);
      });
});
