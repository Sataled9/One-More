//Calculates real weekly values from completed activities
function useStatisticsController(activities, settings, onNavigation) {
  const today = new Date();
  const monday = new Date(today);
  const dayFromMonday = (today.getDay() + 6) % 7;
  monday.setHours(0, 0, 0, 0);
  monday.setDate(today.getDate() - dayFromMonday);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 7);

  const weeklyActivities = activities.filter((activity) => {
    const activityDate = new Date(`${activity.date}T12:00:00`);
    return activityDate >= monday && activityDate < sunday;
  });

  const completedWorkouts = weeklyActivities.length;
  const completedExercises = weeklyActivities.reduce(
    (total, activity) => total + (activity.completedExercises || 0),
    0,
  );
  const runningDistanceKm = weeklyActivities.reduce(
    (total, activity) => total + (activity.distanceKm || 0),
    0,
  );

  const weeklyValues = [0, 0, 0, 0, 0, 0, 0];
  weeklyActivities.forEach((activity) => {
    const activityDate = new Date(`${activity.date}T12:00:00`);
    const index = (activityDate.getDay() + 6) % 7;
    weeklyValues[index] += 1;
  });

  const maxValue = Math.max(...weeklyValues, 1);
  const chartPoints = weeklyValues.map((value, index) => ({
    x: index * 55,
    y: 180 - (value / maxValue) * 140,
    value,
  }));

  return {
    chartPoints,
    completedExercises,
    completedWorkouts,
    goBack: () => onNavigation("fitness"),
    runningDistance: runningDistanceKm,
    runningGoal: settings.weeklyRunningGoalKm,
    runningUnit: "km",
    workoutGoal: settings.weeklyWorkoutGoal,
  };
}

export default useStatisticsController;
