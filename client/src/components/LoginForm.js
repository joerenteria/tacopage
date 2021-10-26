import React, { useState } from "react";
import { useHistory } from "react-router";

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user))
        .then(()=>history.push("/account"))
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (<div>

    <h1>Log in</h1>

    <form className="form1" onSubmit={handleSubmit}>

        <label htmlFor="email">email</label>
        <input
          type="text"
          id="email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
<br/>
        <button className="link1" variant="fill" color="primary" type="submit">
          {isLoading ? "Loading..." : "Submit"}
        </button>

        {errors.map((err) => (
          <div className="error" key={err}>{err}</div>
        ))}

    </form>
    </div>
  );
}

export default LoginForm;
