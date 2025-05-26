const fs = require('fs');
const path = require('path');

describe('boundary', () => {
    let fileContent;

    beforeAll(() => {
        const filePath = path.resolve(__dirname, '../../../../src/components/Book/BookForm.js');
        fileContent = fs.readFileSync(filePath, 'utf8');
    });

    test('BookFormComponent boundary should contain "Title"', () => {
        expect(fileContent).toMatch(/Title/);
    });

    test('BookFormComponent boundary should contain "Author"', () => {
        expect(fileContent).toMatch(/Author/);
    });

    test('BookFormComponent boundary should contain "Price"', () => {
        expect(fileContent).toMatch(/Price/);
    });

    test('BookFormComponent boundary should contain "Description"', () => {
        expect(fileContent).toMatch(/Description/);
    });

    test('BookFormComponent boundary should contain "Update Book" or "Add Book"', () => {
        expect(fileContent).toMatch(/Update Book|Add Book/);
      });
});
