import "./ListingDetailPage.css"
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../common/NotFound";
import LoadingSpinner from "../common/LoadingSpinner";
import ShareBAndBApi from "../api/api";
import AddPhotoForm from "./AddPhotoForm";

/** Page for showing listing details
 * Has URL param id
 *
 * Props:
 * - None
 *
 * States:
 * - listingDetails { id, name, address, description, price, photos }
 * - error (true/false)
 *
 * RoutesList -> ListingDetailPage -> { LoadingSpinner, NotFound }
 */

function ListingDetailPage() {
  const { id } = useParams();
  console.log("ListingDetailPage rendered. id:", id);

  const [listing, setListing] = useState(null);
  const [error, setError] = useState(false);

  console.log("listing data for detail page:", listing);

  async function getListingDetail() {
    try{
      const listingResult = await ShareBAndBApi.getListing(id);
      setListing(listingResult);
    }
    catch(errs){
      setError(true);
      console.log("Errors:", errs);
    }
  }
  useEffect(function getListingDetailOnMount() {
    getListingDetail();
  }, [id]);

  if(error === true) return <NotFound />;
  if (!listing) return <LoadingSpinner/>;

  /** Add photo to a listing.  */
  async function addPhotoToListing(photoData) {
    const photo = {
      ...photoData,
      "listing_id": id
    };
    console.log("adding photo", photo)
    await ShareBAndBApi.addPhoto(photo);
    await getListingDetail();
  }

  const { name, address, description, price, photos, username } = listing;
  const formattedPrice =
    Number(price).toLocaleString("en-US",{ style: 'currency', currency: 'USD' });

  return (
    <div className="ListingDetailPage">
      <h1>{name}</h1>
      <h2>{address}</h2>
      <p>{description}</p>
      <p>{formattedPrice} per day</p>
      <p>Owned by {username}</p>
      {photos.map(photo =>
        <div key={photo.id}>
          <img
            src={photo.source}
            alt={photo.description}
            className="ListingDetailPage-img"
          />
          <p>{photo.description}</p>
        </div>)}
      <AddPhotoForm addPhoto={addPhotoToListing} listing_id={id} />
    </div>
  );
}

export default ListingDetailPage;