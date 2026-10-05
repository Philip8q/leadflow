"use client";

import { useState } from "react";
import FormField from "./FormField.jsx";

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
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <FormField
        id="displayName"
        label="Display name"
        type="text"
        value={values.displayName}
        onChange={handleChange}
        error={errors.displayName}
      />

      <div className="flex items-center gap-2">
        <input
          id="emailNotifications"
          name="emailNotifications"
          type="checkbox"
          checked={values.emailNotifications}
          onChange={handleChange}
          className="h-4 w-4 rounded border-black/20 text-main focus-visible:outline-2 focus-visible:outline-main focus-visible:outline-offset-1"
        />
        <label htmlFor="emailNotifications" className="text-sm font-medium text-text">
          Email notifications
        </label>
      </div>

      <FormField
        id="notificationEmail"
        label="Notification email"
        type="text"
        value={values.notificationEmail}
        onChange={handleChange}
        required={values.emailNotifications}
        aria-required={values.emailNotifications}
        error={errors.notificationEmail}
      />

      <FormField
        id="alertThreshold"
        label="Lead alert threshold"
        type="number"
        min="0"
        max="100"
        step="1"
        value={values.alertThreshold}
        onChange={handleChange}
        error={errors.alertThreshold}
      />

      <button
        type="submit"
        className="w-fit rounded-md bg-main px-4 py-2 font-body text-sm font-medium text-bg hover:opacity-90 focus-visible:outline-2 focus-visible:outline-main focus-visible:outline-offset-2"
      >
        Save settings
      </button>

      {saved && (
        <p role="status" className="text-sm font-medium text-main">
          Settings saved.
        </p>
      )}
    </form>
  );
}

export default SettingsForm;
