import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./user.css";
import UserIcon from "../user.png";

function App() {
  const [data, setData] = useState({
    name: "",
    id: "",
    mail: "",
    number: "",
  });

  const { id } = useParams();

  return (
    <div className="user">
      <div className="user-box">
        <label className="user-icon">
          <img src={UserIcon}></img>
        </label>
        <hr/>
        <div>
          <div className='label'>Name : </div>
          <div className='value'>Vedant Daigavane</div>
        </div>
        <div>
          <div className='label'>Id : </div>
          <div className='value'>Vedant Daigavane</div>
        </div>
        <div>
          <div className='label'>Mail : </div>
          <div className='value'>Vedant Daigavane</div>
        </div>
        <div>
          <div className='label'>Mobile Number : </div>
          <div className='value'>Vedant Daigavane</div>
        </div>
        <hr/>
      </div>
    </div>
  );
}

export default App;
