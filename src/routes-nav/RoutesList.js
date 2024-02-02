import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "../homepage/HomePage";
import ListingsPage from "../listings/ListingsPage";
import AddListingPage from "../listings/AddListingPage";
import ListingDetailPage from "../listings/ListingDetailPage";
import NotFound from "../common/NotFound";
import SignupForm from "../auth/SignupForm";
import LoginForm from "../auth/LoginForm";

/** Routes for sharebandb app.
 *
 * Props:
 * - isLoggedIn (true/false)
 * -login()
 * -signup()
 *
 * States:
 * - None
 *
 * App -> RoutesList
 * -> {NotFound, ListingDetailPage, AddListingPage, ListingsPage}
 */

function RoutesList({ isLoggedIn, login, signup }) {
  console.log("routeslist isLoggedIn", isLoggedIn)
  return (
    <div className="pt-5">
      <Routes>
        {
          (!isLoggedIn)
            ? <>
              <Route path="/signup" element={<SignupForm signup={signup} />} />
              <Route path="/login" element={<LoginForm login={login} />} />
            </>
            : <>
              <Route path="/listings/:id" element={<ListingDetailPage />} />
              <Route path="/add" element={<AddListingPage />} />
              <Route path="/listings" element={<ListingsPage />} />
            </>
        }
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default RoutesList;
