import database from "../../database/db.json";

const API_URL = "http://localhost:3000";
const defaultSettings = database.settings[0];

//Loads settings from json-server or db.json
async function getSettings() {
  try {
    const response = await fetch(`${API_URL}/settings/1`);

    if (!response.ok) {
      throw new Error("Settings could not be loaded.");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return defaultSettings;
  }
}

//Updates the settings saved in json-server
async function updateSettings(settings) {
  try {
    const response = await fetch(`${API_URL}/settings/1`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });

    if (!response.ok) {
      throw new Error("Settings could not be saved.");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return settings;
  }
}

export { defaultSettings, getSettings, updateSettings };
