import "./AddListingPage.css"
import ListingForm from "./ListingForm";
import ShareBAndBApi from "../api/api";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import userContext from "../common/userContext";

/** Page for adding listing to app
 *
 * Props:
 * -None
 *
 * States:
 * -
 *
 * RoutesList -> AddListingPage -> ListingForm
 */

function AddListingPage() {
  const navigate = useNavigate();
  const { currentUser } = useContext(userContext);

  async function saveListing(listingData) {
    console.log("user", currentUser);
    const listingDataWithUserID = {
      ...listingData,
      "owner_user_id": currentUser.data.id
    }
    console.log('adding listing', listingDataWithUserID);
    const result = await ShareBAndBApi.addListing(listingDataWithUserID);
    console.log('result', result);
    navigate(`/listings/${result.id}`);
  }

  return (
    <div className="AddListingPage">
      <h2>Add a listing!</h2>
      <ListingForm saveListing={saveListing} />
    </div>
  );
}

export default AddListingPage;