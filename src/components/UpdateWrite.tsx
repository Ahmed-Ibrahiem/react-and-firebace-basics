import { useEffect, useState } from "react";
import app from "../firebaseConfig";
import { getDatabase } from "firebase/database";
import { GetUser, updateUser } from "../services/Services";
import { useNavigate, useParams } from "react-router";

const db = getDatabase(app);

type user = {
  name: string;
  email: string;
  userId?: string;
};

const UpdatingWrite = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [userNotFound, setUserNotFound] = useState(false);
  const { userId } = useParams();

  useEffect(() => {
    if (!userId) return;
    setLoading(true);

    const fetchUser = async () => {
      try {
        const user: user = (await GetUser(db, userId)).val();

        if (!user) {
          return setUserNotFound(true);
        }
        setLoading(false);

        setName(user.name);
        setEmail(user.email);
      } catch {
        throw Error("Someting Went Wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  const navigate = useNavigate();

  const updateData = () => {
    if (!userId) return;
    const userData = { name, email };
    updateUser(db, userData, userId)
      .then(() => {
        alert("The user has been Updating successfully");
      })
      .catch(() => {
        alert("Something went wrong");
      });
  };

  return (
    <>
      {loading && <div>Loading...</div>}

      {userNotFound && <div>User Not Found</div>}

      {!userNotFound && !loading && (
        <main>
          <h1>Home</h1>

          <div>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <br />
          <button onClick={updateData}>Update User</button>

          <br />
          <div>
            <button className="button1" onClick={() => navigate("/read")}>
              Read Page
            </button>
            <button
              className="button1"
              onClick={() => navigate("/updating-read")}
            >
              Update Page
            </button>
          </div>
        </main>
      )}
    </>
  );
};

export default UpdatingWrite;
