import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./page1.css";
import axios from "axios";
import { allUsers, createUser } from "./urls";

// const defList = [
//   {
//     name: "Vedant Daigavane",
//     id: 33116,
//   },
//   {
//     name: "Shivani",
//     id: 33117,
//   },
//   {
//     name: "Rohit James",
//     id: 33114,
//   },
//   {
//     name: "Suyash Dahake",
//     id: 3317,
//   },
//   {
//     name: "Bhavana",
//     id: 33166,
//   },
// ];

const getUserRow = (user, deleteUser) => {
  return (
    <tr>
      <td> {user.name} </td>
      <td> {user._id} </td>
      <td>
        <Link to={`/user/${user._id}`}>
          <img
            className="icon"
            src="https://img.icons8.com/material-outlined/24/000000/user--v1.png"
          />
        </Link>
      </td>
      <td>
        <Link to={`/update/${user._id}`}>
          <img
            className="icon"
            src="https://img.icons8.com/material-outlined/24/000000/edit--v1.png"
          />
        </Link>
      </td>
      <td>
        <div className="trash-icon" onClick={() => deleteUser(user._id)}>
          <img
            className="icon"
            src="https://img.icons8.com/material-outlined/24/000000/trash--v1.png"
          />
        </div>
      </td>
    </tr>
  );
};

const getUserList = (list = [], deleteUser) => {
  return list.map((user) => getUserRow(user, deleteUser));
};

function App() {
  const [usersList, setUsersList] = useState([]);
  const [success, setSuccess] = useState('');

  let history = useHistory();

  useEffect(async () => {
    setSuccess('');
    try {
      const res = await axios.get('https://crudbackend1191.herokuapp.com/api/user');
      setUsersList(res.data);
    } catch (err) {
      console.log(err);
    }
  }, [setSuccess]);

  const deleteUser = async (userid) => {
    try {
      const res = await axios.delete(`${createUser}/` + `${userid}`);
      console.log(res);
      if(res.statusText === 'OK'){
        setSuccess("User Deleted Successfully");
        setTimeout( () =>{
          setSuccess('');
        }, 3000 )
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="home">
      <h1 className="home-header"> All Users </h1>
      <button onClick={() => history.push("/create")} className="create-user">
        Create User +
      </button>
      <div className="home-container">
        <table cellSpacing="0">
          <thead>
            <tr className="table-head">
              <th>Name</th>
              <th>Id</th>
              <th colSpan="3">Actions</th>
            </tr>
          </thead>
          <tbody>{getUserList(usersList, deleteUser)}</tbody>
        </table>
      </div>
        <div className="success-message">{success}</div>
    </div>
  );
}

export default App;
