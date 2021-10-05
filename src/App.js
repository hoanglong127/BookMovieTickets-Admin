import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Movies from "./views/Movies";
import Users from "./views/Users";
import Showtimes from "./views/Showtimes";
import Signin from "./views/Signin";
import AdminLayout from "./HOCs/Layouts/AdminLayout";

function App() {
  return (
    <BrowserRouter>
      <AdminLayout>
        <Switch>
          <Route path="/movies" component={Movies} />
          <Route path="/users" component={Users} />
          <Route path="/showtimes" component={Showtimes} />
          <Route exact path="/" component={Signin} />
        </Switch>
      </AdminLayout>
    </BrowserRouter>
  );
}

export default App;
