import { useEffect, useState } from "react";

import chestIcon from "../assets/icons/chest.png";
import shouldersIcon from "../assets/icons/shoulders.png";
import tricepsIcon from "../assets/icons/triceps.png";
import absIcon from "../assets/icons/abs.png";
import backIcon from "../assets/icons/back.png";
import bicepsIcon from "../assets/icons/biceps.png";
import forearmsIcon from "../assets/icons/forearms.png";

import alternatePrograms, {
  createWorkoutDays,
  getInitialWorkoutDay,
} from "./alternatePrograms";

import getCurrentWorkout from "./currentWorkout";
import getProgramTimer from "./programTimer";

import {
  getDateCardClassName,
  getExerciseDetails,
  getMuscleCardClassName,
} from "./presentationHelpers";

import {
  getInitialWorkoutData,
  getWorkoutData,
} from "./workoutService";

const muscleIcons = {
  Chest: chestIcon,
  Shoulders: shouldersIcon,
  Triceps: tricepsIcon,
  Abs: absIcon,
  Back: backIcon,
  Biceps: bicepsIcon,
  Forearms: forearmsIcon,
};

const programNames = {
  1: "Strength Foundation - Section A",
  2: "Strength Foundation - Section B",
  3: "Strength Progression - Section C",
  4: "Strength Progression - Section D",
};

const initialWorkoutData = getInitialWorkoutData();

const initialPrograms = initialWorkoutData.programs;
const initialExercises = initialWorkoutData.exercises;

const initialTimer = getProgramTimer();
const initialWorkoutDays = createWorkoutDays(
  new Date(),
  initialTimer.activeCycle,
);
const initialWorkoutDay = getInitialWorkoutDay(initialWorkoutDays);

const initialProgram = alternatePrograms(
  initialWorkoutDay,
  initialPrograms,
  initialExercises,
);

//Stores theworkout day
function useFitnessController(
  onNavigation,
  settings,
  saveActivity,
  activities,
) {
  const timer = getProgramTimer(
    new Date(),
    settings.fitnessStartDate,
  );
  const workoutDays = createWorkoutDays(
    new Date(),
    timer.activeCycle,
  );
  const [programs, setPrograms] = useState(initialPrograms);

  const [exercises, setExercises] = useState(initialExercises);

  const [activeDayId, setActiveDayId] = useState(
    initialProgram.activeDayId,
  );

//Stores the muscle group
  const [activeMuscleGroup, setActiveMuscleGroup] = useState(
    initialProgram.activeMuscleGroup,
  );

//Stores the exercise shown in the GIF preview
  const [activeExerciseId, setActiveExerciseId] = useState(
    initialProgram.activeExerciseId,
  );

//Stores completed exercise ID
  const [completedExerciseIds, setCompletedExerciseIds] =
    useState([]);
  const [savedWorkoutKeys, setSavedWorkoutKeys] = useState([]);

  // Clears completed exercises after a full progress reset
  function resetFitnessProgress() {
    setCompletedExerciseIds([]);
    setSavedWorkoutKeys([]);
  }

//Loads the latest workout data from json-server
  useEffect(() => {
    let isMounted = true;

    async function loadWorkoutData() {
      const workoutData = await getWorkoutData();

      if (!isMounted) {
        return;
      }

      setPrograms(workoutData.programs);
      setExercises(workoutData.exercises);
    }

    loadWorkoutData();

    return () => {
      isMounted = false;
    };
  }, []);

  const currentWorkout = getCurrentWorkout(
    activeDayId,
    activeMuscleGroup,
    workoutDays,
    programs,
    exercises,
  );

  const activeExercise =
    currentWorkout.visibleExercises.find(
      (exercise) => exercise.id === activeExerciseId,
    ) || currentWorkout.visibleExercises[0];

//Selects a workout day
  function selectDay(day) {
    const nextProgram = alternatePrograms(
      day,
      programs,
      exercises,
    );

    if (!nextProgram) {
      return;
    }

    setActiveDayId(nextProgram.activeDayId);

    setActiveMuscleGroup(
      nextProgram.activeMuscleGroup,
    );

    setActiveExerciseId(
      nextProgram.activeExerciseId,
    );
  }

//Selects a muscle group
  function selectMuscleGroup(muscleGroup) {
    const nextWorkout = getCurrentWorkout(
      activeDayId,
      muscleGroup,
      workoutDays,
      programs,
      exercises,
    );

    setActiveMuscleGroup(
      nextWorkout.activeMuscleGroup,
    );

    setActiveExerciseId(
      nextWorkout.visibleExercises[0].id,
    );
  }

//Completes an exercise and moves forward
  function toggleCompleted(exerciseId) {
    const isAlreadyCompleted =
      completedExerciseIds.includes(exerciseId);

    const updatedCompletedIds = isAlreadyCompleted
      ? completedExerciseIds.filter(
          (id) => id !== exerciseId,
        )
      : [...completedExerciseIds, exerciseId];

    setCompletedExerciseIds(updatedCompletedIds);

//Stops when an exercise is unchecked
    if (isAlreadyCompleted) {
      return;
    }

    const programExercises = exercises.filter(
      (exercise) =>
        exercise.programId === currentWorkout.activeProgramId,
    );
    const workoutKey = `${activeDayId}-${currentWorkout.activeProgramId}`;
    const wholeWorkoutCompleted = programExercises.every(
      (exercise) => updatedCompletedIds.includes(exercise.id),
    );

    if (
      wholeWorkoutCompleted &&
      !savedWorkoutKeys.includes(workoutKey) &&
      !activities.some(
        (activity) =>
          activity.type === "fitness" &&
          activity.date === activeDayId &&
          activity.programId === currentWorkout.activeProgramId,
      )
    ) {
      saveActivity({
        date: activeDayId,
        type: "fitness",
        programId: currentWorkout.activeProgramId,
        programName: programNames[currentWorkout.activeProgramId],
        completedExercises: programExercises.length,
      });
      setSavedWorkoutKeys([...savedWorkoutKeys, workoutKey]);
    }

    const allExercisesCompleted =
      currentWorkout.visibleExercises.every(
        (exercise) =>
          updatedCompletedIds.includes(exercise.id),
      );

//Moves to the next muscle group
    if (allExercisesCompleted) {
      const currentMuscleGroupIndex =
        currentWorkout.activeMuscleGroups.indexOf(
          currentWorkout.activeMuscleGroup,
        );

      const nextMuscleGroup =
        currentWorkout.activeMuscleGroups[
          currentMuscleGroupIndex + 1
        ];

      if (nextMuscleGroup) {
        const nextWorkout = getCurrentWorkout(
          activeDayId,
          nextMuscleGroup,
          workoutDays,
          programs,
          exercises,
        );

        setActiveMuscleGroup(nextMuscleGroup);

        setActiveExerciseId(
          nextWorkout.visibleExercises[0].id,
        );

        return;
      }
    }

//Moves to the next exercise
    const exerciseIndex =
      currentWorkout.visibleExercises.findIndex(
        (exercise) => exercise.id === exerciseId,
      );

    const nextExercise =
      currentWorkout.visibleExercises[
        exerciseIndex + 1
      ];

    if (nextExercise) {
      setActiveExerciseId(nextExercise.id);
    }
  }

//Returns to the Dashboard
  function goBackToDashboard() {
    onNavigation("dashboard");
  }

//Prepares workout date cards
  const dateCards = workoutDays.map((day) => {
    const isActive = day.id === activeDayId;

    return {
      ...day,

      isActive,

      className:
        getDateCardClassName(isActive),

      isDisabled: day.programId === null,

      onSelect: () => selectDay(day),
    };
  });

//Prepares muscle group cards
  const muscleCards =
    currentWorkout.activeMuscleGroups.map(
      (muscleGroup) => {
        const isActive =
          muscleGroup ===
          currentWorkout.activeMuscleGroup;

        return {
          name: muscleGroup,

          icon: muscleIcons[muscleGroup],

          isActive,

          className:
            getMuscleCardClassName(isActive),

          onSelect: () =>
            selectMuscleGroup(muscleGroup),
        };
      },
    );

//Prepares exercise cardss
  const exerciseCards =
    currentWorkout.visibleExercises.map(
      (exercise) => ({
        ...exercise,

        weight: exercise.weight,

        details:
          getExerciseDetails(exercise),

        isCompleted:
          completedExerciseIds.includes(
            exercise.id,
          ),

        onSelect: () =>
          setActiveExerciseId(exercise.id),

        onToggleCompleted: (event) => {
          event.stopPropagation();

          toggleCompleted(exercise.id);
        },
      }),
    );

  return {
    activeDay: currentWorkout.activeDay,

    activeExercise,

    activeMuscleGroup:
      currentWorkout.activeMuscleGroup,

    dateCards,

    exerciseCards,


    goBackToDashboard,

    muscleCards,


    programName:
      programNames[currentWorkout.activeProgramId],

    resetFitnessProgress,

    timer,

  };
}

export default useFitnessController;
