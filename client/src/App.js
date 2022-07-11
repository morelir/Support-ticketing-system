import "./App.css";
import { Fragment, useContext, useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Login from "./components/Login";
import UserPanel from "./components/UserPanel";
import AuthContext from "./store/auth-context";
import ProtectedRoute from "./routes/protectedRoute";
import MainNavigation from "./shared/Navigation/MainNavigation";
import AdminPanel from "./components/AdminPanel";
import NotFound from "./pages/NotFound";

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <BrowserRouter>
      <MainNavigation />
      <main>
        <div className="App">
          <Switch>
            <Route exact path="/">
              {!authCtx.isLoggedIn && <Login />}
              {authCtx.isLoggedIn && authCtx.user.role === "regular" && (
                <Redirect to="/UserPanel" />
              )}
              {authCtx.isLoggedIn && authCtx.user.role === "admin" && (
                <Redirect to="/AdminPanel" />
              )}
            </Route>

            <ProtectedRoute
              exact
              condition={
                authCtx.isLoggedIn &&
                (authCtx.user.role === "regular" ||
                  authCtx.user.role === "admin")
              }
              path="/UserPanel"
              component={UserPanel}
            />
            <ProtectedRoute
              exact
              condition={authCtx.isLoggedIn && authCtx.user.role === "admin"}
              path="/AdminPanel"
              component={AdminPanel}
            />
            <ProtectedRoute
              condition={authCtx.isLoggedIn && authCtx.user.role === "admin"}
              exact
              path="/AdminPanel/:userId"
              component={UserPanel}
            />

            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </main>
    </BrowserRouter>
  );
}

export default App;
