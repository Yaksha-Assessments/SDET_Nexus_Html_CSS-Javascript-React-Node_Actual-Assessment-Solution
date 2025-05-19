import React, { useState, useEffect } from 'react';

const AddPolicy = ({ addPolicy, editPolicy, updatePolicy }) => {
    const [policy, setPolicy] = useState({
        type: '',
        interestRate: '',
        offers: '',
    });

    useEffect(() => {
        if (editPolicy) {
            setPolicy({ ...editPolicy });
        } else {
            setPolicy({
                type: '',
                interestRate: '',
                offers: '',
            });
        }
    }, [editPolicy]);

    const isEditForm = !!editPolicy;

    const isFormIncomplete = !policy.type || !policy.interestRate || !policy.offers;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isEditForm) {
            updatePolicy(policy);
        } else {
            addPolicy(policy);
        }
        setPolicy({ type: '', interestRate: '', offers: '' });
    };

    return (
        <div>
            <h2>{isEditForm ? 'Edit Policy' : 'Add a Policy'}</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="type">
                    Type:
                    <input
                        id="type"
                        type="text"
                        value={policy.type}
                        onChange={(e) => setPolicy({ ...policy, type: e.target.value })}
                        required
                    />
                </label>
                <label htmlFor="interestRate">
                    Interest Rate:
                    <input
                        id="interestRate"
                        type="number"
                        value={policy.interestRate}
                        onChange={(e) => setPolicy({ ...policy, interestRate: e.target.value })}
                        required
                    />
                </label>
                <label htmlFor="offers">
                    Offers:
                    <input
                        id="offers"
                        type="text"
                        value={policy.offers}
                        onChange={(e) => setPolicy({ ...policy, offers: e.target.value })}
                        required
                    />
                </label>
                <button type="submit" disabled={isFormIncomplete}>
                    {isEditForm ? 'Update Policy' : 'Add Policy'}
                </button>
            </form>
        </div>
    );
};

export default AddPolicy;
