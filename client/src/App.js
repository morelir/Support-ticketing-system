import "./App.css";
import { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
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
    <AuthContextProvider>
      <Router>
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
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </div>
      </Router>
    </AuthContextProvider>
  );
}

export default App;
