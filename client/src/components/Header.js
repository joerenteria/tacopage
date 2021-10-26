import React from "react";

function Header({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/api/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (<div className="logo">🌮 TacoPage</div>
  );
}

export default Header;
