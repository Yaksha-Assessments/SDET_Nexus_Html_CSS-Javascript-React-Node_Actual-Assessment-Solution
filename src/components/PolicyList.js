import React, { useState } from 'react';

const PolicyList = ({ policies, deletePolicy, setEditPolicy }) => {
    const [filters, setFilters] = useState({ type: '' });

    const filteredPolicies = policies.filter((policy) => {
        return policy.type.toLowerCase().includes(filters.type.toLowerCase());
    });

    const handleDelete = (id) => {
        deletePolicy(id);
    };

    const handleEdit = (policy) => {
        setEditPolicy(policy);
    };

    return (
        <div>
            <div>
                <label htmlFor="type">
                    Filter by Type:
                    <input
                        id="type"
                        type="text"
                        value={filters.type}
                        onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                    />
                </label>
            </div>
            <ul>
                {filteredPolicies.length > 0 ? (
                    filteredPolicies.map((policy) => (
                        <li key={policy.id}>
                            <strong>Type:</strong> {policy.type}
                            <br />
                            <strong>Interest Rate:</strong> {policy.interestRate}
                            <br />
                            <strong>Offers:</strong> {policy.offers}
                            <br />
                            <button onClick={() => handleEdit(policy)}>Edit</button>
                            <button onClick={() => handleDelete(policy.id)}>Delete</button>
                        </li>
                    ))
                ) : (
                    <li>No policies found</li>
                )}
            </ul>
        </div>
    );
};

export default PolicyList;
