function getCurrentWorkout(
  dayId,
  muscleGroup,
  workoutDays,
  programs,
  exercises,
) {
  const activeDay = workoutDays.find((day) => day.id === dayId);

  if (!activeDay || activeDay.programId === null) {
    return null;
  }

  const activeProgramId = activeDay.programId;
  const activeMuscleGroups = programs[activeProgramId];

  if (!activeMuscleGroups) {
    return null;
  }

  const activeMuscleGroup = activeMuscleGroups.includes(muscleGroup)
    ? muscleGroup
    : activeMuscleGroups[0];

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