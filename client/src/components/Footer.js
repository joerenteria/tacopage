import React from "react";
import { Link } from "react-router-dom";

function Footer({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/api/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (<div class="footer">
    Copyright © 2021 🌮 <span className="logofooter">TacoPage</span>
</div>
  );
}

export default Footer;
