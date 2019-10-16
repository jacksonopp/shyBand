import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";

import { setCurrentUser, logoutUser } from "./actions/authActions";
import { Provider } from "react-redux";
import store from "./store";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";

import "./App.css";

import Dashboard from "./components/dashboard/Dashboard";
import CurrentProfileContainer from "./components/profile/CurrentProfileContainer";
import BrowsePage from "./components/browse/BrowsePage";
import UpdateBio from "./components/userSettings/UpdateBio";
import UserProflieContainer from "./components/profile/UserProfileContainer";
import SendMessagePage from "./components/message/SendMessagePage";
import ViewMessages from "./components/message/ViewMessage";
import MessageThread from "./components/message/MessageThread";
import CreateBand from "./components/band/CreateBand"
import BandProfile from "./components/band/BandProfile";


// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
const routes = [
  {
    path: "/dashboard",
    component: Dashboard
  },
  {
    path: "/profile",
    component: CurrentProfileContainer
  },
  {
    path: "/browse",
    component: BrowsePage
  },
  {
    path: "/updateBio",
    component: UpdateBio
  },
  {
    path: "/profile/:id",
    component: Id
  },
  {
    path: "/message/:id",
    component: MessagePage
  },
  {
    path: "/ViewMessage",
    component: ViewMessages
  },
  {
    path: "/viewMessage/:id",
    component: MessageThread
  },
  {
    path: "/createBand",
    component: CreateBand
  },
  {
    path: "/band/:id",
    component: BandProfile
  }

]
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Switch>
              {routes.map(({ path, component }) => (
                <PrivateRoute
                  exact path={path}
                  component={component}
                />
              ))}
              {/* <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/profile" component={CurrentProfile} />
              <PrivateRoute exact path="/browse" component={BrowsePage} />
              <PrivateRoute exact path="/updateBio" component={UpdateBio} /> */}
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;

function Id() {
  // const { id } = useParams();
  return <UserProflieContainer />
}

function MessagePage() {
  return <SendMessagePage />
}