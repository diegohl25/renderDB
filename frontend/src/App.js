import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [records, setRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({ name: '', value: '' });
  const [editRecord, setEditRecord] = useState({ id: null, name: '', value: '' });

  // traer todos los registros manualmente
  const fetchRecords = () => {
    axios.get('https://render-db-4f4i.onrender.com/api/records') 
      .then(response => setRecords(response.data))
      .catch(err => console.log(err));
  };

  const handleAdd = () => {
    axios.post('https://render-db-4f4i.onrender.com/api/records', newRecord)
      .then(() => {
        setNewRecord({ name: '', value: '' });
        fetchRecords(); // actualiza la lista
      })
      .catch(err => console.log(err));
  };

  const handleEdit = () => {
    axios.put(`https://render-db-4f4i.onrender.com/api/records/${editRecord.id}`, editRecord)
      .then(() => {
        setEditRecord({ id: null, name: '', value: '' });
        fetchRecords(); // actualiza la lista
      })
      .catch(err => console.log(err));
  };

  const handleDelete = (id) => {
    axios.delete(`https://render-db-4f4i.onrender.com/api/records/${id}`)
      .then(() => fetchRecords())
      .catch(err => console.log(err));
  };

  return (
    <div className="container mx-auto p-4 max-w-xl">
      <h1 className="text-2xl mb-4 font-bold text-center">CRUD de Registros</h1>

      <div className="mb-6">
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded"
          onClick={fetchRecords}
        >
          Ver todos los registros
        </button>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Agregar nuevo registro</h2>
        <input
          className="border p-2 mr-2 w-full mb-2"
          type="text"
          placeholder="Nombre"
          value={newRecord.name}
          onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
        />
        <input
          className="border p-2 mr-2 w-full mb-2"
          type="text"
          placeholder="Valor"
          value={newRecord.value}
          onChange={(e) => setNewRecord({ ...newRecord, value: e.target.value })}
        />
        <button
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
          onClick={handleAdd}
        >
          Agregar
        </button>
      </div>

      {editRecord.id && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Editar registro</h2>
          <input
            className="border p-2 mr-2 w-full mb-2"
            type="text"
            placeholder="Nombre"
            value={editRecord.name}
            onChange={(e) => setEditRecord({ ...editRecord, name: e.target.value })}
          />
          <input
            className="border p-2 mr-2 w-full mb-2"
            type="text"
            placeholder="Valor"
            value={editRecord.value}
            onChange={(e) => setEditRecord({ ...editRecord, value: e.target.value })}
          />
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded mr-2"
            onClick={handleEdit}
          >
            Guardar cambios
          </button>
          <button
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => setEditRecord({ id: null, name: '', value: '' })}
          >
            Cancelar
          </button>
        </div>
      )}

      <ul>
        {records.map((record) => (
          <li
            key={record.id}
            className="flex justify-between items-center border-b py-2"
          >
            <span>{record.name}: {record.value}</span>
            <div className="space-x-2">
              <button
                className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded"
                onClick={() => setEditRecord(record)}
              >
                Editar
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                onClick={() => handleDelete(record.id)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;