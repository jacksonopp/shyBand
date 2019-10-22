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

import { Grommet } from 'grommet'

import Dashboard from "./components/dashboard/Dashboard";
import CurrentProfileContainer from "./components/profile/CurrentProfileContainer";
import BrowsePage from "./components/browse/BrowsePage";
import UpdateBio from "./components/userSettings/UpdateBio";
import UserProflieContainer from "./components/profile/UserProfileContainer";
import SendMessagePage from "./components/message/SendMessagePage";
import ViewMessages from "./components/message/viewMessage";
import MessageThread from "./components/message/MessageThread";
import CreateBand from "./components/band/CreateBand"
import BandProfile from "./components/band/BandProfile";
import UserSettings from "./components/userSettings/UserSettings";
import ManageBand from "./components/userSettings/ManageBand";
import Sidebar from "./components/sidebar/Sidebar"


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
    component: UserProflieContainer
  },
  {
    path: "/message/:id",
    component: SendMessagePage
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
  },
  {
    path: "/settings",
    component: UserSettings
  },
  {
    path: "/manage/:id",
    component: ManageBand
  },
  {
    path: "/sidebar",
    component: Sidebar
  }

]
const theme = {
  global: {
    font: {
      family: 'Roboto',
      size: '14px',
      height: '20px'
    }
  }
}
class App extends Component {
  render() {
    return (
      <Grommet theme={theme}>
        <Provider store={store}>
          <Router>
            <div className="App">
              <div className="navbar">
                <Navbar className="navBar" />
              </div>
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                {routes.map(({ path, component }) => (
                  <PrivateRoute
                    key={path}
                    exact path={path}
                    component={component}
                  />
                ))}
              </Switch>
            </div>
          </Router>
        </Provider>
      </Grommet>
    );
  }
}
export default App;