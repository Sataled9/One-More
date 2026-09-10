import database from "../../database/db.json";

const API_URL = "http://localhost:3000";

//Loads saved activities from json-servver
async function getActivities() {
  try {
    const response = await fetch(`${API_URL}/activityHistory`);

    if (!response.ok) {
      throw new Error("Activity history could not be loaded.");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return database.activityHistory || [];
  }
}

//sSaves one completed workout
async function createActivity(activity) {
  try {
    const response = await fetch(`${API_URL}/activityHistory`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(activity),
    });

    if (!response.ok) {
      throw new Error("Activity could not be saved.");
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return { ...activity, id: Date.now() };
  }
}

//Deletes every saved activity from json-server
async function deleteAllActivities(activities) {
  try {
    await Promise.all(
      activities.map((activity) =>
        fetch(`${API_URL}/activityHistory/${activity.id}`, {
          method: "DELETE",
        }),
      ),
    );
  } catch (error) {
    console.error(error);
  }
}

export { createActivity, deleteAllActivities, getActivities };
