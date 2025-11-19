// src/components/UsersList.jsx
import React, { useEffect, useState } from 'react';
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from '../services/userService';
import UserForm from './UserForm';
import imgedit from '../assets/edit.png';
import imgdelete from '../assets/delete.png';

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchUsers = async () => {
    const res = await getUsers();
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleSave = async (user) => {
    if (editing) {
      await updateUser(editing.iduser, user);
      setEditing(null);
    } else {
      await createUser(user);
    }
    fetchUsers();
  };

  const handleEdit = (user) => setEditing(user);

  const handleDelete = async (id) => {
    if (window.confirm('¿Seguro que deseas eliminarlo?')) {
      await deleteUser(Number(id));
      fetchUsers();
    }
  };

  return (
    <>
      <hr />
      <h2>Gestión de Usuarios</h2>
      <UserForm onSubmit={handleSave} initialData={editing} />
      <hr />
      <table className="table table-hover">
        <thead className="thead-dark">
          <tr>
            <th>Username</th><th>Nombre</th><th>Rol</th><th>Email</th><th>Estado</th><th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u.iduser}>
              <td>{u.username}</td>
              <td>{u.name}</td>
              <td>{u.roleUser}</td>
              <td>{u.email}</td>
              <td>{u.state ? 'Activo' : 'Inactivo'}</td>
              <td>
                <a onClick={() => handleEdit(u)}><img src={imgedit} title="Editar" alt="Editar" height="20"/></a>
                <a onClick={() => handleDelete(u.iduser)}><img src={imgdelete} title="Eliminar" alt="Eliminar" height="20"/></a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UsersList;
