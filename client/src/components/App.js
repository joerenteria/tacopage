import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import { useHistory } from "react-router";

import NavBar from "./NavBar";
import Login from "../pages/Login";
import Account from "../pages/Account";
import NewPage from "../pages/NewPage";
import Signup from "../pages/Signup";
import '../styles/App.css'




function App() {
  const [user, setUser] = useState(null);
  const history = useHistory();


  

  useEffect(() => {
    // auto-login
    fetch("/api/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  
 

  return (
    <>

      <NavBar user={user} setUser={setUser} />
      <main>
        <Switch>


        <Route path="/login">
        <Login onLogin={setUser} />;
          </Route>

          <Route path="/signup">
        <Signup onLogin={setUser} />;
          </Route>


          <Route path="/new">
            <NewPage user={user} />
          </Route>
          <Route path="/account">
            <Account  user={user} />
          </Route>

          <Route path="/">
          <Signup onLogin={setUser} />;
          </Route>

        </Switch>
      </main>

    </>
  );
}

export default App;
