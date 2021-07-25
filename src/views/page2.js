import "./page2.css";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import Validator from "validator";
import Axios from "axios";
import axios from "axios";
import { createUser } from "./urls";

const defState = {
  name: "",
  email: "",
  number: "",
  password: "87asdasas9",
  id: "",
}

function App() {
  const [editMode, setEditMode] = useState(false);

  const [success, setSuccess] = useState('');

  const [data, setData] = useState(defState);

  const [error, setError] = useState({
    name: "",
    email: "",
    number: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setSuccess('');
    setError({ name: "", email: "", password: "", number: "" });
    let errorsFound = false;
    let errors = {
      name: "",
      number: "",
      email: "",
    };

    if (data.name === "") {
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

    if (data.number > 10000000000 || !Validator.isMobilePhone(data.number.toString())) {
      errorsFound = true;
      errors.number = "Invalid Mobile Number";
    }


    if (!errorsFound && editMode) {
      console.log('sending req')
      try {
        const res = await axios.put(`${createUser}/` + `${data.id}`, data);
        console.log(res);
        if(res.statusText === 'OK'){
          setSuccess("Updated User Details SuccessFully")
        }
      } catch (err) {
        console.log(err);
      }
    }

    if (!errorsFound && !editMode) {
      try {
        const res = await axios.post(`${createUser}/` + `${data.id}`, data);
        console.log(res);
        if(res.statusText === 'OK'){
          setSuccess("User Created SuccessFully")
        }
      } catch (err) {
        console.log(err);
      }
    }

    setError( async () => errors);

  };

  const { id } = useParams();

  useEffect(async () => {
    let edit = false;

    if (id !== undefined) {
      edit = true;
      setEditMode(() => true);
    } 
    else {
      edit = false;
      setEditMode(() => false);
    }

    if (edit) {
      try {
        const res = await axios.get(`${createUser}/` + `${id}`);
        setData({
          name: res.data.name,
          id: res.data._id,
          email: res.data.email,
          password: "87asdasas9",
          number: res.data.number,
        });
      } catch (err) {
        console.log(err);
      }
    }
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
      <div className='success-message'>{success}</div>
      <div>
        <button onClick={handleSubmit}>{editMode ? "Update" : "Create"}</button>
      </div>
    </div>
  );
}

export default App;
