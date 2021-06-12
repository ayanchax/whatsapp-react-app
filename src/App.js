import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Login from "./Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateProviderContextValue } from './StateProvider';
import { actionTypes } from "./reducer";
import { auth } from "./firebase";
function App() {

  const [user, dispatch] = useStateProviderContextValue();
  const [_user, setUser] = useState(null)
  useEffect(() => {
    //backend listener
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user logged in
        console.log(authUser);
        setUser(authUser)
        dispatch({
          type: actionTypes.SET_USER,
          user: authUser,
        })
      } else {
        //user logged out
        dispatch({
          type: "LOG_OUT",
          user: null
        })
        setUser(null)
      }
    });

  }, [_user]);
  return (
    // BEM convention
    <div className="app" >
      {!_user ? (<Login />) :

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