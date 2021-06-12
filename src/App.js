import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Login from "./Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {
  const [user, setUser] = useState(null)
  return (
    // BEM convention
    <div className="app" >
      {!user ? (<Login />) :

        (
          <div className="app__body">
            {/* React routers and switching */}
            <Router>
              <Sidebar />
              <Switch>
                <Route path='/rooms/:rid'> <Chat /></Route>
                <Route path='/'><Chat /></Route>
              </Switch>
            </Router>


          </div>

        )
      }

    </div>
  );
}

export default App;