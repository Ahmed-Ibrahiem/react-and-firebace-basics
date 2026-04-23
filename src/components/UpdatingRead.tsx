import { useState } from "react";
import { GetUsers, updatingReadingData } from "../services/Services";
import { getDatabase } from "firebase/database";
import app from "../firebaseConfig";

const db = getDatabase(app);

type user = {
  name: string;
  email: string;
  userId?: string;
};

const UpdatingRead = () => {
  const [usersData, setUsersData] = useState<user[]>([]);

  const updatingData = async () => {
    try {
      const data: user[] = await updatingReadingData(db);

      setUsersData(data);
    } catch {
      throw Error("Someting went wrong");
    }
  };

  return (
    <div>
      <button onClick={updatingData}>Updating Read</button>

      {!usersData && <h1>No Data Here</h1>}

      {usersData && (
        <ul>
          {usersData.map((data: user, index) => {
            return (
              <li key={index}>
                my name is: {data.name} ---- and my gmail is {data.email} , and
                my id is {data.userId}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default UpdatingRead;
