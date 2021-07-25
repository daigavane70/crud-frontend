import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./user.css";
import UserIcon from "../user.png";
import { createUser as getUser } from "./urls";
import axios from "axios";

function App() {
  const [data, setData] = useState({
    name: "",
    id: "",
    email: "",
    number: "",
  });

  const { id } = useParams();

  useEffect(async () => {
    try {
      const res = await axios.get(`${getUser}/` + `${id}`);
      console.log(res.data);
      setData({
        name: res.data.name,
        id: res.data._id,
        email: res.data.email,
        number: res.data.number
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div className="user">
      <div className="user-box">
        <label className="user-icon">
          <img src={UserIcon}></img>
        </label>
        <hr />
        <div>
          <div className="label">Name : </div>
          <div className="value">{data.name}</div>
        </div>
        <div>
          <div className="label">Id : </div>
          <div className="value">{data.id}</div>
        </div>
        <div>
          <div className="label">Mail : </div>
          <div className="value">{data.email}</div>
        </div>
        <div>
          <div className="label">Mobile Number : </div>
          <div className="value">{data.number}</div>
        </div>
        <hr />
      </div>
    </div>
  );
}

export default App;
