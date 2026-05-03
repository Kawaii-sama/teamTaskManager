import { Link } from "react-router-dom";

function Signup() {
  return (
    <div>
      <h1>Signup Page</h1>

      <Link to="/">
        Go to Login
      </Link>
    </div>
  );
}

export default Signup;