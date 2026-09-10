import { useEffect, useState } from "react";

import {
  createActivity,
  deleteAllActivities,
  getActivities,
} from "./activityService";

//Manages the activity history shared by the app pages
function useActivityController() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    async function loadActivities() {
      setActivities(await getActivities());
    }

    loadActivities();
  }, []);

  async function saveActivity(activity) {
    const savedActivity = await createActivity(activity);
    setActivities((currentActivities) => [
      ...currentActivities,
      savedActivity,
    ]);

    return savedActivity;
  }

  async function clearActivities() {
    await deleteAllActivities(activities);
    setActivities([]);
  }

  return {
    activities,
    clearActivities,
    saveActivity,
  };
}

export default useActivityController;
