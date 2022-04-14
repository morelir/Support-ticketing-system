import "./App.css";
import { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./components/Login";
import UserPanel from "./components/UserPanel";
import AuthContext from "./store/auth-context";
import ProtectedRoute from "./routes/protectedRoute";
import MainNavigation from "./shared/Navigation/MainNavigation";
import AdminPanel from "./components/AdminPanel";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <Router>
      <MainNavigation />
      <main>
        <div className="App">
          <Switch>
            <Route exact path="/"  component={Login}></Route> 
            {/* <Route exact path="/UserPanel"  component={()=>authCtx.isLoggedIn && authCtx.user.role? <UserPanel/>: <Redirect to="/" />}></Route>  */}
            <ProtectedRoute
              condition={authCtx.isLoggedIn && authCtx.user.role === "regular"}
              path="/UserPanel"
              component={UserPanel}
            />
            <ProtectedRoute
              condition={authCtx.isLoggedIn && authCtx.user.role === "admin"}
              path="/AdminPanel"
              component={AdminPanel}
            />
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </div>
      </main>
    </Router>
  );
}

export default App;
