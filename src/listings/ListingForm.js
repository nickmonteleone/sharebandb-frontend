import "./ListingForm.css"
import { useState } from "react";

const INITIAL_FORM_DATA = {
  name: "",
  address: "",
  description: "",
  price: "0",
};

/** Form for adding a listing
 *
 * Props:
 * - saveListing()
 * - initialFormData { name, addresss, description, price, photos }
 *
 * States:
 * - formData { name, addresss, description, price, photos }
 * - formErrors {}
 *
 * AddListingPage -> ListingForm
 */

function ListingForm({ saveListing, initialFormData = INITIAL_FORM_DATA }) {

  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});

  /** Handle change to form, update state. */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => (
      {
        ...data,
        [name]: value,
      }
    ));
  }

  /** Handle form submission and reset form. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    console.log("submitted add form", formData);
    try {
      await saveListing(formData);
      setFormData(initialFormData);
    }
    catch (errs) {
      console.log("form submission errors", errs);
      setFormErrors(errs);
    }

  }

  return (
    <form className="ListingForm" onSubmit={handleSubmit}>
      <div className="ListingForm-field">
        <label className="form-label" htmlFor="name">
          Name:
        </label>
        <input
          name="name"
          className="form-control"
          value={formData.name}
          onChange={handleChange}
        />
        {
          formErrors.name &&
          <div className="ListingForm-error">
            {formErrors.name.map((err, idx) =>
              <li key={idx}>
                {err}
              </li>
            )}
          </div>
        }
      </div>
      <div className="ListingForm-field">
        <label className="form-label" htmlFor="address">
          Address:
        </label>
        <input
          name="address"
          className="form-control"
          value={formData.address}
          onChange={handleChange}
        />
        {
          formErrors.address &&
          <div className="ListingForm-error">
            {formErrors.address.map((err, idx) =>
              <li key={idx}>
                {err}
              </li>
            )}
          </div>
        }
      </div>
      <div className="ListingForm-field">
        <label className="form-label" htmlFor="description">
          Description:
        </label>
        <textarea
          name="description"
          className="form-control"
          value={formData.description}
          onChange={handleChange}
        />
        {
          formErrors.description &&
          <div className="ListingForm-error">
            {formErrors.description.map((err, idx) =>
              <li key={idx}>
                {err}
              </li>
            )}
          </div>
        }
      </div>
      <div className="ListingForm-field">
        <label className="form-label" htmlFor="price">
          Price ($ per day):
        </label>
        <input
          name="price"
          className="form-control"
          value={formData.price}
          onChange={handleChange}
          type="number"
        />
        {
          formErrors.price &&
          <div className="ListingForm-error">
            {formErrors.price.map((err, idx) =>
              <li key={idx}>
                {err}
              </li>
            )}
          </div>
        }
      </div>
      <div className="d-grid">
        <button className="btn btn-secondary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default ListingForm;