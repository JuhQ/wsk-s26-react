import "./App.css";

import { Route, Routes } from "react-router";

import About from "./components/About.jsx";
import Home from "./components/Home.jsx";
import Layout from "./components/Layout.jsx";
import Profile from "./views/Profile.jsx";
import Single from "./views/Single.jsx";
import Upload from "./views/Upload.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/about" element={<About />} />
          <Route path="/single" element={<Single />} />
          <Route path="/upload" element={<Upload />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
