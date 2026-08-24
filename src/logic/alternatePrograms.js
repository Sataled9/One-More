const shortDayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//the 5 day calendar and assigns the correct workout program
function createWorkoutDays(currentDate = new Date()) {
  const workoutDays = [];

  for (let dayDifference = -2; dayDifference <= 2; dayDifference += 1) {
    const date = new Date(currentDate);
    date.setHours(12, 0, 0, 0);
    date.setDate(currentDate.getDate() + dayDifference);

    const weekDay = date.getDay();
    let programId = null;

    if (weekDay === 1 || weekDay === 5) {
      programId = 1;
    }

    if (weekDay === 3) {
      programId = 2;
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    workoutDays.push({
      id: `${year}-${month}-${day}`,
      shortName: shortDayNames[weekDay],
      number: date.getDate(),
      programId,
      dayDifference,
    });
  }

  return workoutDays;
}

//most recent workout day to show when the page opens
function getInitialWorkoutDay(workoutDays) {
  const previousWorkoutDays = workoutDays.filter(
    (day) => day.programId !== null && day.dayDifference <= 0,
  );

  if (previousWorkoutDays.length > 0) {
    return previousWorkoutDays[previousWorkoutDays.length - 1];
  }

  return workoutDays.find((day) => day.programId !== null);
}

//load selected program and sets the first muscle group and exercise
function alternatePrograms(day, programs, exercises) {
  if (!day || day.programId === null) {
    return null;
  }

  const muscleGroups = programs[day.programId];

  if (!muscleGroups || muscleGroups.length === 0) {
    return null;
  }

  const firstMuscleGroup = muscleGroups[0];
  const firstExercise = exercises.find(
    (exercise) =>
      exercise.programId === day.programId &&
      exercise.muscleGroup === firstMuscleGroup,
  );

  if (!firstExercise) {
    return null;
  }

  return {
    activeDayId: day.id,
    activeMuscleGroup: firstMuscleGroup,
    activeExerciseId: firstExercise.id,
  };
}

export default alternatePrograms;
export { createWorkoutDays, getInitialWorkoutDay };
