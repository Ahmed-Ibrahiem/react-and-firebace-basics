import { useState } from "react";
import { updatingReadingData } from "../services/Services";
import { getDatabase } from "firebase/database";
import app from "../firebaseConfig";
import { useNavigate } from "react-router";

const db = getDatabase(app);

type user = {
  name: string;
  email: string;
  userId?: string;
};

const UpdatingRead = () => {
  const [usersData, setUsersData] = useState<user[]>([]);
  const navigate = useNavigate();

  const updatingData = async () => {
    try {
      const data: user[] = await updatingReadingData(db);

      setUsersData(data);
    } catch {
      throw Error("Someting went wrong");
    }
  };

  return (
    <main>
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

export default UpdatingRead;
