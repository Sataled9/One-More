import { useState } from "react";

import Header from "../components/Header";
import BottomMenu from "../components/BottomMenu";
import ExerciseCard from "../components/ExerciseCard";
import Timer from "../components/Timer";

import chestIcon from "../assets/icons/chest.png";
import shouldersIcon from "../assets/icons/shoulders.png";
import tricepsIcon from "../assets/icons/triceps.png";
import absIcon from "../assets/icons/abs.png";
import backIcon from "../assets/icons/back.png";
import bicepsIcon from "../assets/icons/biceps.png";
import forearmsIcon from "../assets/icons/forearms.png";

import svendPressGif from "../assets/gifs/dumbbell-svend-press.gif";
import dumbbellFlyGif from "../assets/gifs/dumbbell-fly.gif";
import flatDumbbellPressGif from "../assets/gifs/flat-dumbbell-press.gif";
import reverseGripPressGif from "../assets/gifs/reverse-grip-press.gif";
import lateralFrontRaiseGif from "../assets/gifs/lateral-front-raise-to-lower.gif";
import circlesToPressGif from "../assets/gifs/circles-to-press.gif";
import rearDeltFlyGif from "../assets/gifs/rear-delt-fly-to-raises.gif";
import uprightRowsGif from "../assets/gifs/upright-rows-and-flys.gif";
import standingTricepExtensionGif from "../assets/gifs/standing-dumbbell-tricep-extensions.gif";
import tricepKickbacksGif from "../assets/gifs/dumbbell-tricep-kickbacks.gif";
import skullCrusherGif from "../assets/gifs/skull-crusher.gif";
import parallelBarDipsGif from "../assets/gifs/parallel-bar-dips.gif";
import standingDumbbellCurlGif from "../assets/gifs/standing-dumbbell-curl.gif";
import standingHammerCurlGif from "../assets/gifs/standing-hammer-curl.gif";
import concentrationCurlGif from "../assets/gifs/concentration-curl.gif";
import alternatingCurlGif from "../assets/gifs/alternating-standing-dumbbell-curl.gif";
import bentOverRowGif from "../assets/gifs/bent-over-dumbbell-row.gif";
import pendlayRowGif from "../assets/gifs/pendlay-row.gif";
import dumbbellDeadliftGif from "../assets/gifs/dumbbell-deadlift.gif";
import supermanMachineDeadliftGif from "../assets/gifs/superman-machine-deadlift.gif";
import gripWristCurlGif from "../assets/gifs/grip-dumbbell-wrist-curl.gif";
import palmsUpWristCurlGif from "../assets/gifs/palms-up-wrist-curl.gif";
import reverseWristCurlGif from "../assets/gifs/reverse-wrist-curl.gif";
import wristExtensionGif from "../assets/gifs/wrist-extension.gif";
import absPlankGif from "../assets/gifs/abs-plank.gif";

import alternatePrograms, {
  createWorkoutDays,
  getInitialWorkoutDay,
} from "../logic/alternatePrograms";
import getCurrentWorkout from "../logic/getCurrentWorkout";


const workoutDays = createWorkoutDays();

// Define muscle groups included in workout
const programs = {
  1: ["Chest", "Shoulders", "Triceps", "Abs"],
  2: ["Biceps", "Back", "Forearms", "Abs"],
};


//Connects muscle group with the icon 
const muscleIcons = {
  Chest: chestIcon,
  Shoulders: shouldersIcon,
  Triceps: tricepsIcon,
  Abs: absIcon,
  Back: backIcon,
  Biceps: bicepsIcon,
  Forearms: forearmsIcon,
};

//Workout exercise data used by the Fitness page
const exercises = [
  { id: 1, programId: 1, muscleGroup: "Chest", name: "Dumbbell Svend Press", sets: 2, repetitions: 16, weight: "10 kg", gif: svendPressGif },
  { id: 2, programId: 1, muscleGroup: "Chest", name: "Dumbbell Fly", sets: 2, repetitions: 16, weight: "10 kg", gif: dumbbellFlyGif },
  { id: 3, programId: 1, muscleGroup: "Chest", name: "Flat Dumbbell Press", sets: 2, repetitions: 16, weight: "10 kg", gif: flatDumbbellPressGif },
  { id: 4, programId: 1, muscleGroup: "Chest", name: "Dumbbell Reverse Grip Press", sets: 2, repetitions: 16, weight: "10 kg", gif: reverseGripPressGif },
  { id: 5, programId: 1, muscleGroup: "Shoulders", name: "Lateral Front Raise to Lower", sets: 2, repetitions: 16, weight: "5 kg", gif: lateralFrontRaiseGif },
  { id: 6, programId: 1, muscleGroup: "Shoulders", name: "Circles to Press", sets: 2, repetitions: 16, weight: "5 kg", gif: circlesToPressGif },
  { id: 7, programId: 1, muscleGroup: "Shoulders", name: "Rear Delt Fly to Raises", sets: 2, repetitions: 16, weight: "5 kg", gif: rearDeltFlyGif },
  { id: 8, programId: 1, muscleGroup: "Shoulders", name: "Upright Rows + Flys", sets: 2, repetitions: 16, weight: "5 kg", gif: uprightRowsGif },
  { id: 9, programId: 1, muscleGroup: "Triceps", name: "Standing Dumbbell Tricep Extensions", sets: 2, repetitions: 16, weight: "11-12 kg", gif: standingTricepExtensionGif },
  { id: 10, programId: 1, muscleGroup: "Triceps", name: "Dumbbell Tricep Kickbacks", sets: 2, repetitions: 16, weight: "11-12 kg", gif: tricepKickbacksGif },
  { id: 11, programId: 1, muscleGroup: "Triceps", name: "Skull Crusher", sets: 2, repetitions: 16, weight: "11-12 kg", gif: skullCrusherGif },
  { id: 12, programId: 1, muscleGroup: "Triceps", name: "Parallel Bar Dips", sets: 2, repetitions: 16, weight: "Bodyweight", gif: parallelBarDipsGif },
  { id: 13, programId: 1, muscleGroup: "Abs", name: "Abs Plank", sets: 1, durationSeconds: 120, weight: "Bodyweight", gif: absPlankGif },
  { id: 14, programId: 2, muscleGroup: "Biceps", name: "Standing Dumbbell Curl", sets: 2, repetitions: 16, weight: "10 kg", gif: standingDumbbellCurlGif },
  { id: 15, programId: 2, muscleGroup: "Biceps", name: "Standing Hammer Curl", sets: 2, repetitions: 16, weight: "10 kg", gif: standingHammerCurlGif },
  { id: 16, programId: 2, muscleGroup: "Biceps", name: "Concentration Curl", sets: 2, repetitions: 16, weight: "10 kg", gif: concentrationCurlGif },
  { id: 17, programId: 2, muscleGroup: "Biceps", name: "Alternating Standing Dumbbell Curl", sets: 2, repetitions: 16, weight: "10 kg", gif: alternatingCurlGif },
  { id: 18, programId: 2, muscleGroup: "Back", name: "Bent Over Dumbbell Row", sets: 2, repetitions: 16, weight: "10 kg", gif: bentOverRowGif },
  { id: 19, programId: 2, muscleGroup: "Back", name: "Pendlay Row", sets: 2, repetitions: 16, weight: "10 kg", gif: pendlayRowGif },
  { id: 20, programId: 2, muscleGroup: "Back", name: "Dumbbell Deadlift (or TRX)", sets: 2, repetitions: 16, weight: "10 kg", gif: dumbbellDeadliftGif },
  { id: 21, programId: 2, muscleGroup: "Back", name: "Superman - Machine Deadlift", sets: 2, repetitions: 16, weight: "10 kg", gif: supermanMachineDeadliftGif },
  { id: 22, programId: 2, muscleGroup: "Forearms", name: "Grip Dumbbell Wrist Curl", sets: 2, repetitions: 16, weight: "10-15 kg", gif: gripWristCurlGif },
  { id: 23, programId: 2, muscleGroup: "Forearms", name: "Palms-up Wrist Curl", sets: 2, repetitions: 16, weight: "10-15 kg", gif: palmsUpWristCurlGif },
  { id: 24, programId: 2, muscleGroup: "Forearms", name: "Reverse Wrist Curl", sets: 2, repetitions: 16, weight: "10-15 kg", gif: reverseWristCurlGif },
  { id: 25, programId: 2, muscleGroup: "Forearms", name: "Wrist Extension", sets: 2, repetitions: 16, weight: "10-15 kg", gif: wristExtensionGif },
  { id: 26, programId: 2, muscleGroup: "Abs", name: "Abs Plank", sets: 1, durationSeconds: 120, weight: "Bodyweight", gif: absPlankGif },
];


//Sets workout shown when Fitness page opens
const initialWorkoutDay = getInitialWorkoutDay(workoutDays);
const initialProgram = alternatePrograms(
  initialWorkoutDay,
  programs,
  exercises,
);

//Keeps track of the day
function Fitness({ onNavigation }) {
  const [activeDayId, setActiveDayId] = useState(initialProgram.activeDayId);
  const [activeMuscleGroup, setActiveMuscleGroup] = useState(
    initialProgram.activeMuscleGroup,
  );
  const [activeExerciseId, setActiveExerciseId] = useState(
    initialProgram.activeExerciseId,
  );
  const [completedExerciseIds, setCompletedExerciseIds] = useState([1]);


  const currentWorkout = getCurrentWorkout(
    activeDayId,
    activeMuscleGroup,
    workoutDays,
    programs,
    exercises,
  );

  const activeDay = currentWorkout.activeDay;
  const activeMuscleGroups = currentWorkout.activeMuscleGroups;
  const visibleExercises = currentWorkout.visibleExercises;
  const activeExercise =
    visibleExercises.find((exercise) => exercise.id === activeExerciseId) ||
    visibleExercises[0];


  function selectDay(day) {
    const nextProgram = alternatePrograms(day, programs, exercises);

    if (!nextProgram) {
      return;
    }

    setActiveDayId(nextProgram.activeDayId);
    setActiveMuscleGroup(nextProgram.activeMuscleGroup);
    setActiveExerciseId(nextProgram.activeExerciseId);
  }


  function selectMuscleGroup(muscleGroup) {
    const nextWorkout = getCurrentWorkout(
      activeDayId,
      muscleGroup,
      workoutDays,
      programs,
      exercises,
    );

    setActiveMuscleGroup(nextWorkout.activeMuscleGroup);
    setActiveExerciseId(nextWorkout.visibleExercises[0].id);
  }

//Completes exercise and moves to the next
  function toggleCompleted(exerciseId) {
    const isAlreadyCompleted = completedExerciseIds.includes(exerciseId);

    setCompletedExerciseIds((currentIds) =>
      currentIds.includes(exerciseId)
        ? currentIds.filter((id) => id !== exerciseId)
        : [...currentIds, exerciseId],
    );

    if (!isAlreadyCompleted) {
      const completedExerciseIndex = visibleExercises.findIndex(
        (exercise) => exercise.id === exerciseId,
      );
      const nextExercise = visibleExercises[completedExerciseIndex + 1];

      if (nextExercise) {
        setActiveExerciseId(nextExercise.id);
      }
    }
  }


  function goBackToDashboard() {
    onNavigation("dashboard");
  }

  return (
    <div className="app-shell">
      <Header
        title="Fitness"
        showBackArrow={true}
        onBack={goBackToDashboard}
      />

      <main className="fitness">
        <h1 className="visually-hidden">Fitness</h1>

        <section className="fitness__dates" aria-label="Workout dates">
          {workoutDays.map((day) => {
            const isActive = day.id === activeDayId;
            const dateClassName = isActive
              ? "date-card date-card--active"
              : "date-card";

            return (
              <button
                className={dateClassName}
                type="button"
                key={day.id}
                disabled={day.programId === null}
                aria-pressed={isActive}
                onClick={() => selectDay(day)}
              >
                <span className="date-card__day">{day.shortName}</span>
                <span className="date-card__number">{day.number}</span>
              </button>
            );
          })}
        </section>

        <section
          className="fitness__muscles"
          aria-label={`${activeDay.shortName} muscle groups`}
        >
          {activeMuscleGroups.map((muscleGroup) => {
            const isActive = muscleGroup === activeMuscleGroup;
            const muscleClassName = isActive
              ? "muscle-card muscle-card--active"
              : "muscle-card";

            return (
              <button
                className={muscleClassName}
                type="button"
                key={muscleGroup}
                aria-pressed={isActive}
                onClick={() => selectMuscleGroup(muscleGroup)}
              >
                <img src={muscleIcons[muscleGroup]} alt="" />
                <span>{muscleGroup}</span>
              </button>
            );
          })}
        </section>

        <section
          className="exercise-preview"
          aria-labelledby="current-exercise-title"
        >
          <img
            src={activeExercise.gif}
            alt={`Male athlete performing ${activeExercise.name}`}
          />

          <div className="exercise-preview__caption">
            <h2 id="current-exercise-title">{activeExercise.name}</h2>
          </div>
        </section>

        <section
          className="fitness__exercise-list"
          aria-labelledby="exercise-list-title"
        >
          <h2 id="exercise-list-title">{activeMuscleGroup} exercises</h2>

          {visibleExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.id}
              name={exercise.name}
              sets={exercise.sets}
              repetitions={exercise.repetitions}
              durationSeconds={exercise.durationSeconds}
              weight={exercise.weight}
              isCompleted={completedExerciseIds.includes(exercise.id)}
              isSelected={exercise.id === activeExercise.id}
              onSelect={() => setActiveExerciseId(exercise.id)}
              onToggleCompleted={() => toggleCompleted(exercise.id)}
            />
          ))}
        </section>

        <Timer daysRemaining={60} />
      </main>

      <BottomMenu activeItem="fitness" onNavigation={onNavigation} />
    </div>
  );
}

export default Fitness;
