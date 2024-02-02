import './App.css';
import { useState, useEffect } from 'react';
import useLocalStorage from "use-local-storage";
import { BrowserRouter } from 'react-router-dom';
import RoutesList from './routes-nav/RoutesList';
import NavBar from './routes-nav/NavBar';
import { jwtDecode as decode } from "jwt-decode";
import ShareBAndBApi from './api/api';

import userContext from './common/userContext';
/** App component for sharebandb frontend
 *
 * Props:
 * -None
 *
 * States:
 * -None
 *
 * App -> {RoutesList, NavBar}
 */

function App() {

  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage("sharebandb-token");

  const isLoggedIn = (currentUser !== null)
  console.log("App loaded, user:", currentUser, isLoggedIn)

  useEffect(
    function loadUserInfo() {
      console.debug("App useEffect loadUserInfo", "token=", token);
      async function getCurrentUser() {
        if (token) {
          try {
            let user = decode(token);
            // put the token on the Api class so it can use it to call the API.
            ShareBAndBApi.token = token;
            console.log("decoded token", decode(token))
            setCurrentUser(user);
          } catch (err) {
            console.error("App loadUserInfo: problem loading", err);
            setCurrentUser(null);
          }
        } else {
          setCurrentUser(null);
        }
      }
      getCurrentUser();
    },
    [token]
  );

  /**logout of site */
  function logout(){
    setCurrentUser(null);
    setToken(null);
  }

  /**login to site */
  async function login(loginData){
    const token = await ShareBAndBApi.login(
      loginData.username,
      loginData.password,
    );
    setToken(token);
  }

  /**signup to site */
  async function signup(loginData){
    const token = await ShareBAndBApi.signup(
      loginData.username,
      loginData.password
    );
    setToken(token);
  }

  return (
    <userContext.Provider
      value={{
        currentUser: currentUser,
      }}
    >
      <div className="App">
      <BrowserRouter>
        <NavBar logout={logout} isLoggedIn={isLoggedIn}/>
        <RoutesList
          isLoggedIn={isLoggedIn}
          login={login}
          signup={signup}/>
      </BrowserRouter>
      </div>
    </userContext.Provider>
  );
}

export default App;
