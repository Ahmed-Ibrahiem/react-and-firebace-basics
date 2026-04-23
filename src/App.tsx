import { Routes, Route } from "react-router";
import Write from "./components/Write";
import Read from "./components/Read";
import UpdatingRead from "./components/UpdatingRead";
import UpdatingWrite from "./components/UpdateWrite";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Write />} />
        <Route path="/write" element={<Write />} />
        <Route path="/read" element={<Read />} />
        <Route path="/updating-read" element={<UpdatingRead />} />
        <Route path="/update-write/:userId" element={<UpdatingWrite />} />
      </Routes>
    </div>
  );
};

export default App;
