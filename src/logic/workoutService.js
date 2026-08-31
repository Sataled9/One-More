import database from "../../database/db.json"

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

const API_URL = "http://localhost:3000";

//Connects every GIF in database to its imported file
const exerciseGifs = {
  "dumbbell-svend-press.gif": svendPressGif,
  "dumbbell-fly.gif": dumbbellFlyGif,
  "flat-dumbbell-press.gif": flatDumbbellPressGif,
  "reverse-grip-press.gif": reverseGripPressGif,
  "lateral-front-raise-to-lower.gif": lateralFrontRaiseGif,
  "circles-to-press.gif": circlesToPressGif,
  "rear-delt-fly-to-raises.gif": rearDeltFlyGif,
  "upright-rows-and-flys.gif": uprightRowsGif,
  "standing-dumbbell-tricep-extensions.gif": standingTricepExtensionGif,
  "dumbbell-tricep-kickbacks.gif": tricepKickbacksGif,
  "skull-crusher.gif": skullCrusherGif,
  "parallel-bar-dips.gif": parallelBarDipsGif,
  "standing-dumbbell-curl.gif": standingDumbbellCurlGif,
  "standing-hammer-curl.gif": standingHammerCurlGif,
  "concentration-curl.gif": concentrationCurlGif,
  "alternating-standing-dumbbell-curl.gif": alternatingCurlGif,
  "bent-over-dumbbell-row.gif": bentOverRowGif,
  "pendlay-row.gif": pendlayRowGif,
  "dumbbell-deadlift.gif": dumbbellDeadliftGif,
  "superman-machine-deadlift.gif": supermanMachineDeadliftGif,
  "grip-dumbbell-wrist-curl.gif": gripWristCurlGif,
  "palms-up-wrist-curl.gif": palmsUpWristCurlGif,
  "reverse-wrist-curl.gif": reverseWristCurlGif,
  "wrist-extension.gif": wristExtensionGif,
  "abs-plank.gif": absPlankGif,
};

//Organizes muscle groups using the program ID
function preparePrograms(programs) {
    const preparedPrograms = {};

    programs.forEach((program) => {
        preparedPrograms[program.id] = program.muscleGroups;
    });

    return preparedPrograms;
}

//Adds correct GIF file to every exercise
function prepareExercises(exercises) {
    return exercises.map((exercise) => ({
        ...exercise,
        gif: exerciseGifs[exercise.gif],
    }));
}

//Loads initial data directly from dbjson
function getInitialWorkoutData() {
    return {
        programs: preparePrograms(database.programs),
        exercises: prepareExercises(database.exercises),
    };
}

// Loads data from Api OR uses db.json if the request fails
async function getWorkoutData() {
    try {
        const programResponse = await fetch(`${API_URL}/programs`);
        const exerciseResponse = await fetch(`${API_URL}/exercises`);

        if (!programResponse.ok || !exerciseResponse.ok) {
            throw new Error("Workout data could not be loaded.");
        }

        const programs =await programResponse.json();
        const exercises = await exerciseResponse.json();

       return {
      programs: preparePrograms(programs),
      exercises: prepareExercises(exercises),
    };
    } catch (error) {
        console.error(error);
        return getInitialWorkoutData();
    }
}

export { getInitialWorkoutData, getWorkoutData };