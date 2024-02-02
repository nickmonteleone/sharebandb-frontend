import "./HomePage.css"
import { useContext } from "react";
import userContext from "../common/userContext";

/** HomePage component for initial landing.
 *
 * Props:
 * -None
 *
 * States:
 * -None
 *
 * RoutesList -> HomePage
 */

function HomePage() {
  const { currentUser } = useContext(userContext);

  return (
    <div className="HomePage">
      <h1>ShareB&B</h1>
      <h3 className="mb-4">Your home away from home!</h3>
      { !currentUser
        ? <h4>Login or signup to share.</h4>
        : <h4>Welcome, {currentUser.data.username}.</h4>
    }

    </div>
  );
}

export default HomePage;
