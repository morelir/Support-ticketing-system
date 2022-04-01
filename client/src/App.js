import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link,
  //Navigate
} from "react-router-dom";
import Login from "./components/Login"

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login/>}></Route>


        
      </Routes>
    </Router>
  );
}

export default App;
