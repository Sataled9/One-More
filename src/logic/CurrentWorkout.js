//Returns workout data for selected day and muscle grop
function getCurrentWorkout(
  dayId,
  muscleGroup,
  workoutDays,
  programs,
  exercises,
) {
//Select workout day
  const activeDay = workoutDays.find(
    (day) => day.id === dayId,
  );

  if (!activeDay || activeDay.programId === null) {
    return null;
  }

  const activeProgramId = activeDay.programId;
  const activeMuscleGroups = programs[activeProgramId];

  if (!activeMuscleGroups) {
    return null;
  }

//Uses first muscle group when selected one is unavailable
  const activeMuscleGroup = activeMuscleGroups.includes(
    muscleGroup,
  )
    ? muscleGroup
    : activeMuscleGroups[0];

//Filters exercises by program and muscle group
  const visibleExercises = exercises.filter(
    (exercise) =>
      exercise.programId === activeProgramId &&
      exercise.muscleGroup === activeMuscleGroup,
  );

  return {
    activeDay,
    activeProgramId,
    activeMuscleGroups,
    activeMuscleGroup,
    visibleExercises,
  };
}

export default getCurrentWorkout;