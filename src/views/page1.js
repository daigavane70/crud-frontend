import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "./page1.css";
import axios from 'axios';
import {allUsers} from './urls';

const defList = [
  {
    name: "Vedant Daigavane",
    id: 33116,
  },
  {
    name: "Vedant",
    id: 33117,
  },
  {
    name: "Vedant Daigavane",
    id: 33114,
  },
  {
    name: "Vedant Daigavane",
    id: 3317,
  },
  {
    name: "Vedant Daigavane",
    id: 33166,
  },
];

const getUserRow = (user) => {
  return (
    <tr>
      <td> {user.name} </td>
      <td> {user.id} </td>
      <td>
        <Link to={`/user/${user.id}`}>
          <img
            className="icon"
            src="https://img.icons8.com/material-outlined/24/000000/user--v1.png"
          />
        </Link>
      </td>
      <td>
        <Link to={`/update/${user.id}`}>
          <img
            className="icon"
            src="https://img.icons8.com/material-outlined/24/000000/edit--v1.png"
          />
        </Link>
      </td>
      <td>
        <div className="trash-icon">
          <img
            className="icon"
            src="https://img.icons8.com/material-outlined/24/000000/trash--v1.png"
          />
        </div>
      </td>
    </tr>
  );
};

const getUserList = (list = defList) => {
  return list.map((user) => getUserRow(user));
};

function App() {

  const [usersList, setUsersList] = useState(defList);

  let history = useHistory();

  useEffect( async () => {
    try {
      const res = await axios.get( allUsers );
      console.log(res);
    }
    catch(err) {
      console.log(err)
    }
  }, []);

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
          <tbody>{getUserList(usersList)}</tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
