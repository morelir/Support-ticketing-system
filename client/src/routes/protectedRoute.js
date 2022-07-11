import { MdHistoryToggleOff } from "react-icons/md";
import {
  Route,
  Redirect,
} from "react-router-dom";

const ProtectedRoute = (props) => {
  if (props.condition) {
    return <Route exact={props.exact} path={props.path} component={props.component}/>;
  }else{
    return <Redirect to="/" />;
  }
};

export default ProtectedRoute;
