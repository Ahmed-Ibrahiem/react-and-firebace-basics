import { useState } from "react";
import app from "../firebaseConfig";
import { getDatabase } from "firebase/database";
import { SaveUser } from "../services/Services";
import { useNavigate } from "react-router";

const db = getDatabase(app);

const Write = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate()

  const addUser = () => {
    const userData = { name, email };
    SaveUser(db, userData)
      .then(() => {
        alert("The new user has been added successfully");
      })
      .catch(() => {
        alert("Something went wrong");
      });
  };

  return (
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
      <button onClick={addUser}>Save Data</button>

      <br />
      <div>
        <button className="button1" onClick={()=> navigate("/read")}>Read Page</button>
        <button className="button1" onClick={()=> navigate("/updating-read")}>Update Page</button>
      </div>
    </main>
  );
};

export default Write;
