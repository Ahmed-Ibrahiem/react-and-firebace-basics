import { useState } from "react";
import { deleteUser, updatingReadingData } from "../services/Services";
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

  const removeUser = (id: string) => {
    deleteUser(db, id)
      .then(() => {
        alert("The user Has benn deleted");
      })
      .catch(() => alert("the deleted user proccess has been faild"));
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
                my id is {data.userId}{" "}
                <button
                  className="button2"
                  onClick={() => navigate(`/update-write/${data.userId}`)}
                >
                  update
                </button>
                <button
                  className="button2"
                  onClick={() => {
                    data.userId && removeUser(data.userId);
                    updatingData();
                  }}
                >
                  delete
                </button>
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
