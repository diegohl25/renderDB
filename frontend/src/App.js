import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [records, setRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({ name: '', value: '' });
  const [editRecord, setEditRecord] = useState({ id: null, name: '', value: '' });

  useEffect(() => {
    axios.get('http://localhost:3001/api/records')
      .then(response => setRecords(response.data))
      .catch(err => console.log(err));
  }, [records]);

  const handleAdd = () => {
    axios.post('http://localhost:3001/api/records', newRecord)
      .then(() => setNewRecord({ name: '', value: '' }))
      .catch(err => console.log(err));
  };

  const handleEdit = () => {
    axios.put(`http://localhost:3001/api/records/${editRecord.id}`, editRecord)
      .then(() => setEditRecord({ id: null, name: '', value: '' }))
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/api/records/${id}`)
      .catch(err => console.log(err));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Records</h1>

      <div className="mb-4">
        <h2>Add a Record</h2>
        <input
          className="border p-2 m-2"
          type="text"
          placeholder="Name"
          value={newRecord.name}
          onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
        />
        <input
          className="border p-2 m-2"
          type="text"
          placeholder="Value"
          value={newRecord.value}
          onChange={(e) => setNewRecord({ ...newRecord, value: e.target.value })}
        />
        <button
          className="bg-blue-500 text-white p-2"
          onClick={handleAdd}
        >
          Add
        </button>
      </div>

      <div className="mb-4">
        <h2>Edit a Record</h2>
        <input
          className="border p-2 m-2"
          type="text"
          placeholder="Name"
          value={editRecord.name}
          onChange={(e) => setEditRecord({ ...editRecord, name: e.target.value })}
        />
        <input
          className="border p-2 m-2"
          type="text"
          placeholder="Value"
          value={editRecord.value}
          onChange={(e) => setEditRecord({ ...editRecord, value: e.target.value })}
        />
        <button
          className="bg-green-500 text-white p-2"
          onClick={handleEdit}
        >
          Save
        </button>
      </div>

      <ul>
        {records.map((record) => (
          <li key={record.id} className="mb-2">
            <span>{record.name}: {record.value}</span>
            <button
              className="bg-red-500 text-white ml-2 p-1"
              onClick={() => handleDelete(record.id)}
            >
              Delete
            </button>
            <button
              className="bg-yellow-500 text-white ml-2 p-1"
              onClick={() => setEditRecord(record)}
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
