import React, { useState } from "react";
import { useHistory } from "react-router";

function SignUpForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    setErrors([]);
    setIsLoading(true);
    fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        password_confirmation: passwordConfirmation,

      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((user) => onLogin(user));
        history.push("/account");
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (<div>
    <h1>Sign up</h1>
    <form className="form1" onSubmit={handleSubmit}>

        <label htmlFor="email">email</label>
        <input
          type="text"
          id="email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password">password <span className="blue">*no spaces</span></label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        <label htmlFor="password">confirm password</label>
        <input
          type="password"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete="current-password"
        />
<br/>
        <button className="link1" type="submit">{isLoading ? "Loading..." : "Submit"}</button>

        {errors.map((err) => (
          <div className="error" key={err}>{err}</div>
        ))}

    </form>
    </div>
  );
}

export default SignUpForm;
