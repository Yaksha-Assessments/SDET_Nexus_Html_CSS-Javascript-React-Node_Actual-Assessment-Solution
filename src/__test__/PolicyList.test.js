import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PolicyList from '../components/PolicyList';

const policies = [
    { id: 1, type: 'Policy 1', interestRate: 3.5, offers: 'Offer 1' },
    { id: 2, type: 'Policy 2', interestRate: 4.0, offers: 'Offer 2' },
];

const deletePolicy = jest.fn();
const setEditPolicy = jest.fn();

describe('boundary', () => {
    beforeEach(() => {
        render(
            <PolicyList
                policies={policies}
                deletePolicy={deletePolicy}
                setEditPolicy={setEditPolicy}
            />
        );
    });

    test('PolicyListComponent boundary it has a "Filter by Type" text field', () => {
        const typeInput = screen.getByLabelText('Filter by Type:');
        expect(typeInput).toBeTruthy();
    });

    test('PolicyListComponent boundary it displays the Type of a policy after assigning values', async () => {
        const filterInput = screen.getByLabelText('Filter by Type:');
        fireEvent.change(filterInput, { target: { value: 'Policy 1' } });
        const strongElement = await screen.findByText('Type:');
        expect(strongElement).toBeTruthy();
    });

    test('PolicyListComponent boundary it displays the Interest Rate of a policy after assigning values', async () => {
        const filterInput = screen.getByLabelText('Filter by Type:');
        fireEvent.change(filterInput, { target: { value: 'Policy 1' } });
        const strongElement = await screen.findByText('Interest Rate:');
        expect(strongElement).toBeTruthy();
    });

    test('PolicyListComponent boundary it displays the Offers of a policy after assigning values', async () => {
        const filterInput = screen.getByLabelText('Filter by Type:');
        fireEvent.change(filterInput, { target: { value: 'Policy 1' } });
        const strongElement = await screen.findByText('Offers:');
        expect(strongElement).toBeTruthy();
    });

    test('PolicyListComponent boundary it displays the "Edit" button to edit the policy', async () => {
        const editButtons = screen.getAllByText('Edit');
        expect(editButtons).toBeTruthy();
    });

    test('PolicyListComponent boundary it calls deletePolicy when "Delete" button is clicked', () => {
        const deleteButtons = screen.getAllByText('Delete');
        fireEvent.click(deleteButtons[0]);
        expect(deletePolicy).toHaveBeenCalledWith(policies[0].id);
    });

    test('PolicyListComponent boundary it removes the policy after clicking the "Delete" button', () => {
        const deleteButton = screen.getAllByText('Delete')[0];
        fireEvent.click(deleteButton);
        expect(screen.queryByText('Type: Policy 1')).toBeNull();
        expect(screen.queryByText('Interest Rate: 3.5')).toBeNull();
        expect(screen.queryByText('Offers: Offer 1')).toBeNull();
    });

    test('PolicyListComponent boundary it displays "No policies found" when there are no policies', async () => {
        render(
            <PolicyList policies={[]} deletePolicy={deletePolicy} setEditPolicy={setEditPolicy} />
        );
        const noPoliciesMessage = await screen.findByText('No policies found');
        expect(noPoliciesMessage).toBeTruthy();
    });
});
