import "./App.css";
import { useContext} from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Login";
import UserPanel from "./components/UserPanel";
import AuthContext from "./store/auth-context";
import MainNavigation from "./shared/Navigation/MainNavigation";
import AdminPanel from "./components/AdminPanel";


function App() {
  const authCtx = useContext(AuthContext);
  let routes;
  if (!authCtx.isLoggedIn) {
    routes = (
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else if (authCtx.isLoggedIn && authCtx.user.role === "regular") {
    routes = (
      <Switch>
        <Route exact path="/">
          <UserPanel />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else if (authCtx.isLoggedIn && authCtx.user.role === "admin") {
    routes = (
      <Switch>
        <Route exact path="/">
          <AdminPanel />
        </Route>
        <Route exact path="/UserPanel">
          {" "}
          {/*path="/AdminPanel/:userId" */}
          <UserPanel />
        </Route>

        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <BrowserRouter>
      <MainNavigation />
      <main>
        <div className="App">{routes}</div>
      </main>
    </BrowserRouter>
  );
}

export default App;
