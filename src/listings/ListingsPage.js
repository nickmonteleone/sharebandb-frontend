import { useEffect, useState } from "react";
import ShareBAndBApi from "../api/api";
import ListingCard from "./ListingCard";
import SearchForm from "../common/SearchForm";
import LoadingSpinner from "../common/LoadingSpinner";

/**Render page showing all available listings for renting
 *
 * Props:
 * -None
 *
 * State:
 * -listings [{ id, name, addresss, description, price, photos },...]
 *
 * RoutesList -> ListingsPage -> { ListingCard, SearchListingsForm }
 */

function ListingsPage() {
  const [listings, setListings] = useState();

  /** Get listings from api. Optional search criteria. */
  async function getListings(searchTerm="") {
    const listingsResults = await ShareBAndBApi.getListings(searchTerm);
    console.log("listingsResults", listingsResults)
    setListings(listingsResults);
  }

  useEffect(function fetchAndSetListings() {
    console.log("Listings page useEffect on first render")
    getListings();
  }, []);

  if (!listings) return <LoadingSpinner />;

  return (
    <div>
      <SearchForm search={getListings}/>
      { listings.length === 0
        ? <h2>No results found!</h2>
        : listings.map(listing => (
          <ListingCard
            key={listing.id}
            listing={listing} />
        ))
      }
    </div>
  );
}

export default ListingsPage;