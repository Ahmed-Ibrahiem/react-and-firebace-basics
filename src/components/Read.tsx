import { useState } from "react";
import { GetUsers } from "../services/Services";
import { getDatabase } from "firebase/database";
import app from "../firebaseConfig";
import { useNavigate } from "react-router";

const db = getDatabase(app);

type user = {
  name: string;
  email: string;
};

const Read = () => {
  const [usersData, setUsersData] = useState([]);
  const navigate = useNavigate();

  const showData = async () => {
    try {
      const req = await GetUsers(db);

      if (req.exists()) {
        setUsersData(Object.values(req.val()));
      }
    } catch {
      throw Error("Someting went wrong");
    }
  };

  return (
    <main>
      <button onClick={showData}>View Users</button>

      {!usersData && <h1>No Data Here</h1>}

      {usersData && (
        <ul>
          {usersData.map((data: user, index) => {
            return (
              <li key={index}>
                my name is: {data.name} ---- and my gmail is {data.email}{" "}
              </li>
            );
          })}
        </ul>
      )}

      <div>
        <button className="button1" onClick={() => navigate("/read")}>
          Read Page
        </button>
        <button className="button1" onClick={() => navigate("/updating-read")}>
          Update Page
        </button>
        <button className="button1" onClick={() => navigate("/")}>
          Home
        </button>
      </div>
    </main>
  );
};

export default Read;
