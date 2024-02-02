
/** Loading spinner while getting data from backend api.
 *
 * Props:
 * - None
 *
 * States:
 * - None
 *
 * { ListingsPage, ListingDetail } -> LoadingSpinner
 */

function LoadingSpinner() {
  return (
    <h1 className="LoadingSpinner">
      Loading ...
    </h1>
  );
}

export default LoadingSpinner;