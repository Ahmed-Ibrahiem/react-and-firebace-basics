import { Routes, Route } from "react-router";
import Write from "./components/Write";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Write />} />
        <Route path="/write" element={<Write />} />
      </Routes>
    </div>
  );
};

export default App;
