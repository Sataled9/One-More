import { useState } from "react";

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

import { getInitialWorkoutData } from "./workoutService";

const muscleIcons = {
  Chest: chestIcon,
  Shoulders: shouldersIcon,
  Triceps: tricepsIcon,
  Abs: absIcon,
  Back: backIcon,
  Biceps: bicepsIcon,
  Forearms: forearmsIcon,
};

const workoutDays = createWorkoutDays();

const { programs, exercises } = getInitialWorkoutData();

const initialWorkoutDay = getInitialWorkoutDay(workoutDays);

const initialProgram = alternatePrograms(
  initialWorkoutDay,
  programs,
  exercises,
);

//Stores theworkout day
function useFitnessController(onNavigation) {
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

    timer: getProgramTimer(),
  };
}

export default useFitnessController;