import LoginForm from "../components/LoginForm";
import Footer from "../components/Footer";

function Login({ onLogin }) {

  return (
    <div className="page1">
      
          <LoginForm onLogin={onLogin} />
          <Footer/>
    </div>
  );
}

export default Login;
