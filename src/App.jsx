import "./App.css";

import Home from "./components/Home.jsx";
import Welcome from "./Welcome.jsx";

function App() {
  return (
    <>
      <Home />
      <Welcome name="Ilkka" />
      <Welcome name="Juha" />
      <Welcome name="Viivi" />
      <Welcome name="Ahmed" />
    </>
  );
}

export default App;
