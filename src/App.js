import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddPolicy from './components/AddPolicy';
import PolicyList from './components/PolicyList';

function App() {
  const [policies, setPolicies] = useState([]);
  const [editPolicy, setEditPolicy] = useState(null);

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const response = await axios.get('http://localhost:4000/policies');
        setPolicies(response.data);
      } catch (error) {
        console.error('Error fetching policies:', error);
      }
    };
    fetchPolicies();
  }, []);

  const addPolicy = async (policy) => {
    try {
      const addedPolicy = await axios.post('http://localhost:4000/policies', policy);
      setPolicies([...policies, addedPolicy.data]);
    } catch (error) {
      console.error('Error adding policy:', error);
    }
  };

  const deletePolicy = async (policyId) => {
    try {
      await axios.delete(`http://localhost:4000/policies/${policyId}`);
      setPolicies(policies.filter((policy) => policy.id !== policyId));
    } catch (error) {
      console.error('Error deleting policy:', error);
    }
  };

  const updatePolicy = async (policy) => {
    try {
      await axios.put(`http://localhost:4000/policies/${policy.id}`, policy);
      setPolicies(
        policies.map((p) => (p.id === policy.id ? { ...p, ...policy } : p))
      );
      setEditPolicy(null);
    } catch (error) {
      console.error('Error updating policy:', error);
    }
  };

  return (
    <div>
      <h2>Welcome to Policy Finder</h2>
      <h2>Add Policy</h2>
      <AddPolicy addPolicy={addPolicy} editPolicy={editPolicy} updatePolicy={updatePolicy} />
      <h2>Policy List</h2>
      <PolicyList
        policies={policies}
        deletePolicy={deletePolicy}
        setEditPolicy={setEditPolicy}
      />
    </div>
  );
}

export default App;
