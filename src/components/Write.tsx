import { useState } from "react";
import app from "../firebaseConfig";
import { getDatabase } from "firebase/database";
import { SaveUser } from "../services/Services";

const db = getDatabase(app);

const Write = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

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
    <div>
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
    </div>
  );
};

export default Write;
