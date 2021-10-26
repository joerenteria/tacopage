import React from "react";
import { Link } from "react-router-dom";

function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/api/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }


  return (<div className="navbar">

<div className="logo">🌮 TacoPage</div>
<div className="navslide">
        <Link className="link1" as={Link} to="/signup">
          Sign up
        </Link>

        {user ? (
        <Link className="link1" to="/" onClick={handleLogoutClick}>
          Log out
        </Link>
        ) : (
        <Link className="link1" as={Link} to="/login">
          Log in
        </Link>
        )}

        

        {user ? (
        <Link className="link1" as={Link} to="/account">
          My pages
        </Link>
        
        ) : (
        ""
        )}
       
       </div>

</div>
  );
}

export default NavBar;
