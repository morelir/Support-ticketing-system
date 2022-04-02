import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link,
  //Navigate
} from "react-router-dom";
import Login from "./components/Login"
import UserPanel from "./components/UserPanel";
import { AuthContextProvider } from './store/auth-context';

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <Routes>
          <Route exact path="/" element={<Login/>}></Route>
          <Route exact path="/UserPanel" element={<UserPanel/>}></Route>

          
        </Routes>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
