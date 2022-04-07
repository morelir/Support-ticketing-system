import "./App.css";
import { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link,
  // Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import UserPanel from "./components/UserPanel";
import { AuthContextProvider } from "./store/auth-context";
import AuthContext from "./store/auth-context";
import ProtectedRoute from "./routes/protectedRoute";
import MainNavigation from "./shared/Navigation/MainNavigation";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Router>
      <AuthContextProvider>
        <MainNavigation />
        <div className="App">
          <Switch>
            <Route exact path="/" component={Login}></Route>
            {/* <Route exact path="/UserPanel" component={UserPanel}></Route> */}
            <ProtectedRoute
              condition={true}
              path="/UserPanel"
              component={UserPanel}
            />
          </Switch>
        </div>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
