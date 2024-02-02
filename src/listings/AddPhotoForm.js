import { useState } from "react";

const INITIAL_FORM_DATA = {
  file: null,
  description: "",
};

/** Form for adding a photo to a listing
 *
 * Props:
 * - addPhoto()
 * - initialFormData { file, description, listing_id }
 *
 * States:
 * - formData { file, description, listing_id }
 */

function AddPhotoForm({ addPhoto, initialFormData = INITIAL_FORM_DATA }) {

  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});

  /** Handle change to non file inputs, update state. */
  function handleChangeToNonFileInputs(evt) {
    const { name, value } = evt.target;
    setFormData(data => (
      {
        ...data,
        [name]: value,
      }
    ));
  }

  /** Handle change to form, update state. */
  function handleChangeToFile(evt) {
    console.log("evt target", evt.target.files[0]);
    const file = evt.target.files[0];
    setFormData(data => (
      {
        ...data,
        "file": file,
      }
    ));
  }

  /** Handle form submission and reset form. */
  async function handleSubmit(evt) {
    evt.preventDefault();
    // console.log("evt target", evt.target.files[0]);
    console.log("submitted add photo form", formData);
    try {
      await addPhoto(formData);
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
        <label className="form-label" htmlFor="description">
          Description:
        </label>
        <input
          name="description"
          className="form-control"
          value={formData.description}
          onChange={handleChangeToNonFileInputs}
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
        <label className="form-label" htmlFor="file">
          Photo:
        </label>
        <input
          name="file"
          className="form-control"
          onChange={handleChangeToFile}
          type="file"
        />
        <div className="ListingForm-error">
        {
          formErrors.file &&
          <div className="ListingForm-error">
            {formErrors.file.map((err, idx) =>
              <li key={idx}>
                {err}
              </li>
            )}
          </div>
        }
        </div>
      </div>
      <div className="d-grid">
        <button className="btn btn-secondary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </form>
  );
}

export default AddPhotoForm;