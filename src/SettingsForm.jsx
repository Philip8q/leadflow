import { useState } from "react";

const INITIAL_SETTINGS = {
  displayName: "",
  emailNotifications: true,
  leadAlertThreshold: 50,
};

function SettingsForm() {
  const [settings, setSettings] = useState(INITIAL_SETTINGS);
  const [saved, setSaved] = useState(false);

  function handleChange(event) {
    const { name, type, checked, value } = event.target;
    setSaved(false);
    setSettings((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSaved(true);
  }

  return (
    <form onSubmit={handleSubmit} aria-label="Settings">
      <h2>Settings</h2>

      <div>
        <label htmlFor="displayName">Display name</label>
        <input
          id="displayName"
          name="displayName"
          type="text"
          value={settings.displayName}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="emailNotifications">
          <input
            id="emailNotifications"
            name="emailNotifications"
            type="checkbox"
            checked={settings.emailNotifications}
            onChange={handleChange}
          />
          Email notifications
        </label>
      </div>

      <div>
        <label htmlFor="leadAlertThreshold">Lead alert threshold</label>
        <input
          id="leadAlertThreshold"
          name="leadAlertThreshold"
          type="number"
          min="0"
          max="100"
          value={settings.leadAlertThreshold}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Save settings</button>
      {saved && <p role="status">Settings saved.</p>}
    </form>
  );
}

export default SettingsForm;
