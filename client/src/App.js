import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home"

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>


        
      </Routes>
    </Router>
  );
}

export default App;
