import "./page2.css";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Validator from "validator";
import Axios from 'axios';
import axios from "axios";
import {createUser} from './urls';

function App() {
  const [editMode, setEditMode] = useState(false);

  const [data, setData] = useState({
    name: "",
    email: "",
    number: "",
    password: '879'
  });

  const [error, setError] = useState({
    name: "",
    password: "",
    email: "",
    number: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError({ name: "", email: "", password: "", number: "" });
    let errorsFound = false;
    let errors = {
      name: "",
      password: "",
      number: "",
      email: "",
    };

    if (data.name === "" || !Validator.isAlpha(data.name)) {
      errorsFound = true;
      errors.name = "Plese enter a valid name";
    }
    if (!Validator.isEmail(data.email) || data.email === "") {
      errorsFound = true;
      errors.mail = "Invalid Email address";
    }
    // if (data.id === "") {
    //   errorsFound = true;
    //   errors.id = "Invalid Id (should be Numeric)";
    // }
    if (data.number === "" || !Validator.isMobilePhone(data.number)) {
      errorsFound = true;
      errors.number = "Invalid Mobile Number";
    }

    setError(errors);

    if (!errorsFound) {
      try{
        const res = await axios.post(createUser, data);
        console.log(res);
      }
      catch(err){
        console.log(err);
      }
    }
  };

  const { id } = useParams();

  useEffect(() => {
    console.log(id);

    if (id !== undefined) setEditMode(() => true);
    else setEditMode(() => false);
  }, []);

  return (
    <div className="edit-update">
      <div className="title">{editMode ? "Update Profile" : "Create User"}</div>
      <div className="form-box">
        <div className="input-label">Name</div>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          value={data.name}
        />
        {/* <div className="error">{error.name}</div>
        <div className="input-label">Id</div>
        <input
          type="number"
          name="id"
          onChange={handleChange}
          value={data.id}
        /> */}
        <div className="error">{error.id}</div>
        <div className="input-label">EMail</div>
        <input
          type="mail"
          name="email"
          onChange={handleChange}
          value={data.email}
        />
        <div className="error">{error.email}</div>
        <div className="input-label">Phone Number</div>
        <input
          type="number"
          name="number"
          onChange={handleChange}
          value={data.number}
        />
        <div className="error">{error.number}</div>
      </div>
      <div>
        <button onClick={handleSubmit}>{editMode ? "Update" : "Create"}</button>
      </div>
    </div>
  );
}

export default App;
