import React from 'react';
import { render, screen } from '@testing-library/react';
import AddPolicy from '../components/AddPolicy';

const addPolicyMock = jest.fn();
const updatePolicyMock = jest.fn();

describe('boundary', () => {
    test('AddPolicyComponent boundary it is rendered', () => {
        render(<AddPolicy addPolicy={addPolicyMock} />);
        expect(screen.getByRole('heading')).toBeTruthy();
    });

    test('AddPolicyComponent boundary it has "Add a Policy" h2', () => {
        render(<AddPolicy addPolicy={addPolicyMock} />);
        const h2Element = screen.getByRole('heading');
        expect(h2Element.textContent).toBe('Add a Policy');
    });

    test('AddPolicyComponent boundary it has "Edit Policy" h2 when in edit mode', () => {
        render(<AddPolicy editPolicy={{ type: 'Edit Policy' }} updatePolicy={updatePolicyMock} />);
        const h2Element = screen.getByRole('heading');
        expect(h2Element.textContent).toBe('Edit Policy');
    });

    test('AddPolicyComponent boundary it has type input field', () => {
        render(<AddPolicy addPolicy={addPolicyMock} />);
        const typeInput = screen.getByLabelText('Type:');
        expect(typeInput).toBeTruthy();
    });

    test('AddPolicyComponent boundary it has interestRate input field', () => {
        render(<AddPolicy addPolicy={addPolicyMock} />);
        const interestRateInput = screen.getByLabelText('Interest Rate:');
        expect(interestRateInput).toBeTruthy();
    });

    test('AddPolicyComponent boundary it has offers input field', () => {
        render(<AddPolicy addPolicy={addPolicyMock} />);
        const offersInput = screen.getByLabelText('Offers:');
        expect(offersInput).toBeTruthy();
    });

    test('AddPolicyComponent boundary it has an "Add Policy" button', () => {
        render(<AddPolicy addPolicy={addPolicyMock} />);
        const addButton = screen.getByRole('button', { name: 'Add Policy' });
        expect(addButton).toBeTruthy();
    });

    test('AddPolicyComponent boundary it has an "Update Policy" button when in edit mode', () => {
        render(<AddPolicy editPolicy={{ type: 'Edit Policy' }} updatePolicy={updatePolicyMock} />);
        const updateButton = screen.getByRole('button', { name: 'Update Policy' });
        expect(updateButton).toBeTruthy();
    });
});
