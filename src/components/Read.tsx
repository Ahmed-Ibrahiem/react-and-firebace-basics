import { useState } from "react";
import { GetUsers } from "../services/Services";
import { getDatabase } from "firebase/database";
import app from "../firebaseConfig";

const db = getDatabase(app);

type user = {
  name: string;
  email: string;
};

const Read = () => {
  const [usersData, setUsersData] = useState([]);

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
    <div>
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
    </div>
  );
};

export default Read;
