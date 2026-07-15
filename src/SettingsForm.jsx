import { useState } from "react";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const INITIAL_VALUES = {
  displayName: "",
  notificationEmail: "",
  emailNotifications: true,
  alertThreshold: "",
};

function validateDisplayName(displayName) {
  const trimmed = displayName.trim();
  if (!trimmed) {
    return "Display name is required";
  }
  if (trimmed.length < 2 || trimmed.length > 50) {
    return "Display name must be between 2 and 50 characters";
  }
  return null;
}

function validateNotificationEmail(notificationEmail, emailNotifications) {
  if (!emailNotifications) {
    return null;
  }
  const trimmed = notificationEmail.trim();
  if (!trimmed) {
    return "Notification email is required";
  }
  if (!EMAIL_PATTERN.test(trimmed)) {
    return "Enter a valid email address";
  }
  return null;
}

function validateAlertThreshold(alertThreshold) {
  if (alertThreshold === "") {
    return "Lead alert threshold is required";
  }
  const threshold = Number(alertThreshold);
  if (!Number.isInteger(threshold)) {
    return "Threshold must be a whole number";
  }
  if (threshold < 0 || threshold > 100) {
    return "Threshold must be between 0 and 100";
  }
  return null;
}

function validateSettings(values) {
  const errors = {};

  const displayNameError = validateDisplayName(values.displayName);
  if (displayNameError) errors.displayName = displayNameError;

  const emailError = validateNotificationEmail(
    values.notificationEmail,
    values.emailNotifications,
  );
  if (emailError) errors.notificationEmail = emailError;

  const thresholdError = validateAlertThreshold(values.alertThreshold);
  if (thresholdError) errors.alertThreshold = thresholdError;

  return errors;
}

function FieldError({ id, message }) {
  if (!message) return null;
  return (
    <span id={id} role="alert" className="field-error">
      {message}
    </span>
  );
}

function SettingsForm() {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setSaved(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validateSettings(values);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSaved(false);
      return;
    }

    setErrors({});
    setSaved(true);
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="displayName">Display name</label>
        <input
          id="displayName"
          name="displayName"
          type="text"
          value={values.displayName}
          onChange={handleChange}
          aria-invalid={Boolean(errors.displayName)}
          aria-describedby={errors.displayName ? "displayName-error" : undefined}
        />
        <FieldError id="displayName-error" message={errors.displayName} />
      </div>

      <div>
        <input
          id="emailNotifications"
          name="emailNotifications"
          type="checkbox"
          checked={values.emailNotifications}
          onChange={handleChange}
        />
        <label htmlFor="emailNotifications">Email notifications</label>
      </div>

      <div>
        <label htmlFor="notificationEmail">Notification email</label>
        <input
          id="notificationEmail"
          name="notificationEmail"
          type="text"
          value={values.notificationEmail}
          onChange={handleChange}
          required={values.emailNotifications}
          aria-required={values.emailNotifications}
          aria-invalid={Boolean(errors.notificationEmail)}
          aria-describedby={
            errors.notificationEmail ? "notificationEmail-error" : undefined
          }
        />
        <FieldError id="notificationEmail-error" message={errors.notificationEmail} />
      </div>

      <div>
        <label htmlFor="alertThreshold">Lead alert threshold</label>
        <input
          id="alertThreshold"
          name="alertThreshold"
          type="number"
          min="0"
          max="100"
          step="1"
          value={values.alertThreshold}
          onChange={handleChange}
          aria-invalid={Boolean(errors.alertThreshold)}
          aria-describedby={
            errors.alertThreshold ? "alertThreshold-error" : undefined
          }
        />
        <FieldError id="alertThreshold-error" message={errors.alertThreshold} />
      </div>

      <button type="submit">Save settings</button>

      {saved && <p role="status">Settings saved.</p>}
    </form>
  );
}

export default SettingsForm;
