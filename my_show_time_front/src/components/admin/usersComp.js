import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const handleDelete = async (itemId) => {
  try {
    const response = await axios.delete(`http://localhost:3000/users/${itemId}`);
    console.log(response.data);
    setItems(items.filter((item) => item._id !== itemId));
    // handle success response
  } catch (error) {
    console.error(error);
    // handle error response
  }
  window.location.reload(false);
};

function adminUsers() {
  const [dataUsers, setDataUsers] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/users')
    .then(response => setDataUsers(response.data))
    .then((response) => response)
    .catch(error => console.error(error));
  }, []);
  console.log(dataUsers);

  return (
    <div class="admin_concert">
      <Link href="/admin"><button>Back</button></Link>
      <h1>USERS MANAGER PAGE</h1>
      
      <table>
          <thead>
            <tr>
              <th><h3>ID</h3></th>
              <th><h3>FIRSTNAME</h3></th>
              <th><h3>LASTNAME</h3></th>
              <th><h3>EMAIL</h3></th>
              <th><h3>STATUS</h3></th>
            </tr>
          </thead>
          {dataUsers && dataUsers.map((item, i) => (
            <tbody>
              <td key={i}>{ item._id }</td>
              <td key={i}>{ item.firstname }</td>
              <td key={i}>{ item.lastname }</td>
              <td key={i}>{ item.email }</td>
              {item.isAdmin==true && <td key={i}><b>Admin</b></td>}
              {item.isAdmin==false && <td key={i}>User</td>}
              <td><button>EDIT</button></td>
              <td><button onClick={() => handleDelete(item._id)}>DELETE</button></td>
            </tbody>
            ))
          }
      </table>
    </div>

  );
}

export default adminUsers;