import axios from 'axios';
import React, { useState, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css';
import Navbar from './component/layout/Navbar';
import Search from './component/users/Search';
import Users from './component/users/Users'
import Alert from './component/layout/Alert';
import about from './component/pages/about';
import User from './component/users/User';

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, SetAlert] = useState('');

  // async componentDidMount() {
  //   this.setState({ loading: true });
  //   const res = await axios.get(`https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
  //   this.setState({ users: res.data, loading: false });
  // }

  //search users with particular text
  const searchUsers = async (text: string) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    setUsers(res.data.items);
    setLoading(false);
  }

  //get user details for specific username
  const getUser = async (username: string) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    setUser(res.data);
    setLoading(false);
  }

  //get repos details for specific username
  const getUserRepos = async (username: string) => {
    setLoading(true);
    const res = await axios.get(`https://api.github.com/users/${username}/repos?perpage=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`)
    setRepos(res.data);
    setLoading(false);
  }

  //clear the users from state.
  const ClearUsers = () => {
    setLoading(true);
    setUsers([]);
    setLoading(false);
  }

  //alert user to enter text while searching
  const ShowAlert = () => {
    SetAlert("Please enter search text");
    setTimeout(() => SetAlert(''), 3000);
  }

    return (
      <Router>
        <Navbar />
        <div className="container">
          {alert !== '' && (<Alert Alert={alert} />)}
          <Switch>
            <Route exact path='/' render={props => (
              <Fragment>
                <Search searchUsers={searchUsers} 
                ShowClear={users.length > 0 ? true : false} 
                ClearUsers={ClearUsers} 
                SetAlert={ShowAlert} />
                <Users loading={loading} users={users} />
              </Fragment>
            )}>
            </Route>
            <Route exact path='/about' component={about}></Route>
            <Route exact path='/user/:login' render={props => (
              <User
                {...props}
                getUser={getUser}
                getUserRepos={getUserRepos}
                loading={loading}
                user={user}
                repos={repos}
              />
            )}>
            </Route>
          </Switch>
        </div>
      </Router >
    );
  }

export default App;