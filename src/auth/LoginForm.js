import { useState } from "react";
import "./LoginForm.css";
import { useNavigate } from "react-router-dom";

/** Login form/page for user to authenticate
 *
 * Props:
 * - login (callback fn)
 *
 * States:
 * - formData { username, password }
 * - formError ""
 *
 * RoutesList -> LoginForm
 */

function LoginForm({ login }) {
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
      await login(formData);
      navigate("/");
    } catch (err) {
      setFormError(err);
    }
  }

  return (
    <form className="LoginForm" onSubmit={handleSubmit}>
      <h2>Login to ShareB&B</h2>
      <div className="LoginForm-field">
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
      <div className="LoginForm-field">
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
        <div className="LoginForm-error">
          <li>{formError}</li>
        </div>
      }
      <div className="d-grid mt-3">
        <button className="btn btn-secondary" onClick={handleSubmit}>
          Login
        </button>
      </div>
    </form>
  );
}

export default LoginForm;