import { useState } from "react";
import "./SignupForm.css";
import { useNavigate } from "react-router-dom";

/** Signup form/page to add new user
 *
 * Props:
 * - signup (callback fn)
 *
 * States:
 * - formData { username, password }
 * - formError ""
 *
 * RoutesList -> SignupForm
 */

function SignupForm({ signup }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [formError, setFormError] = useState(null);

  /** Update form data on change */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  /** Handle form submission */
  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      await signup(formData);
      navigate("/");
    } catch (err) {
      setFormError(err);
    }
  }

  return (
    <form className="SignupForm" onSubmit={handleSubmit}>
      <h2>Signup for ShareB&B</h2>
      <div className="SignupForm-field">
        <label className="form-label" htmlFor="username">
          Username:
        </label>
        <input
          name="username"
          className="form-control"
          value={formData.username}
          onChange={handleChange}
        />
      </div>
      <div className="SignupForm-field">
        <label className="form-label" htmlFor="password">
          Password:
        </label>
        <input
          name="password"
          className="form-control"
          value={formData.password}
          onChange={handleChange}
          type="password"
          autoComplete="false"
        />
      </div>
      {
        formError &&
        <div className="SignupForm-error">
          <li>{formError}</li>
        </div>
      }
      <div className="d-grid mt-3">
        <button className="btn btn-secondary" onClick={handleSubmit}>
          Signup
        </button>
      </div>
    </form>
  );
}

export default SignupForm;