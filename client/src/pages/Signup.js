import SignUpForm from "../components/SignUpForm";
import Footer from "../components/Footer";

function Signup({ onLogin }) {

return (
    <div className="page1">
<h1>Welcome to TacoPage</h1>
<div className="content2"><span className="blue">TacoPage</span> is a free, quick and easy page builder perfect for:
<ul>
  <li className="blue">Temporary websites</li>
  <li className="blue">Promoting events</li>
  <li className="blue">Posting information online</li>
  
</ul>

  Just complete a simple form and <span className="blue">TacoPage</span> does the rest. See a sample page <a target="_blank" href="/tesla">here.</a></div>


<hr/>

          <SignUpForm onLogin={onLogin} />
          
          <Footer />
          
    </div>
  );
}

export default Signup;
