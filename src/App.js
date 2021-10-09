import "./App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";
import Movies from "./views/Movies";
import Users from "./views/Users";
import Showtimes from "./views/Showtimes";
import Signin from "./views/Signin";
import AdminLayout from "./HOCs/Layouts/AdminLayout";
import { AuthRoute, PrivateRoute } from "./HOCs/Routes";
import { fetchAdminInfo } from "./store/actions/authAction";
import AddMovie from "./views/Movies/AddMovie";
import EditMovie from "./views/Movies/EditMovie";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem("t_a")) dispatch(fetchAdminInfo);
  }, []);

  return (
    <BrowserRouter>
      <AdminLayout>
        <Switch>
          <PrivateRoute
            exact
            path="/movies"
            component={Movies}
            redirectPath="/"
          />
          <PrivateRoute
            path="/movies/addMovie"
            component={AddMovie}
            redirectPath="/"
          />
          <PrivateRoute
            path="/movies/editMovie/:id"
            component={EditMovie}
            redirectPath="/"
          />
          <PrivateRoute path="/users" component={Users} redirectPath="/" />
          <PrivateRoute
            path="/showtimes"
            component={Showtimes}
            redirectPath="/"
          />
          <AuthRoute exact path="/" component={Signin} redirectPath="/movies" />
        </Switch>
      </AdminLayout>
    </BrowserRouter>
  );
}

export default App;
