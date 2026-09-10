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
import inclineDumbbellPressGif from "../assets/gifs/incline-dumbbell-press.gif";
import dumbbellPulloverGif from "../assets/gifs/dumbbell-pullover.gif";
import inclineDumbbellFlyGif from "../assets/gifs/incline-dumbbell-fly.gif";
import dumbbellFloorPressGif from "../assets/gifs/dumbbell-floor-press.gif";
import arnoldPressGif from "../assets/gifs/arnold-press.gif";
import seatedDumbbellShoulderPressGif from "../assets/gifs/seated-dumbbell-shoulder-press.gif";
import dumbbellLateralRaiseGif from "../assets/gifs/dumbbell-lateral-raise.gif";
import bentOverReverseFlyGif from "../assets/gifs/bent-over-reverse-fly.gif";
import closeGripDumbbellPressGif from "../assets/gifs/close-grip-dumbbell-press.gif";
import singleArmTricepsExtensionGif from "../assets/gifs/single-arm-triceps-extension.gif";
import dumbbellTatePressGif from "../assets/gifs/dumbbell-tate-press.gif";
import diamondPushUpGif from "../assets/gifs/diamond-push-up.gif";
import weightedRussianTwistGif from "../assets/gifs/weighted-russian-twist.gif";
import oneArmDumbbellRowGif from "../assets/gifs/one-arm-dumbbell-row.gif";
import renegadeRowGif from "../assets/gifs/renegade-row.gif";
import dumbbellRomanianDeadliftGif from "../assets/gifs/dumbbell-romanian-deadlift.gif";
import chestSupportedDumbbellRowGif from "../assets/gifs/chest-supported-dumbbell-row.gif";
import zottmanCurlGif from "../assets/gifs/zottman-curl.gif";
import inclineDumbbellCurlGif from "../assets/gifs/incline-dumbbell-curl.gif";
import crossBodyHammerCurlGif from "../assets/gifs/cross-body-hammer-curl.gif";
import dumbbellDragCurlGif from "../assets/gifs/dumbbell-drag-curl.gif";
import seatedDumbbellWristCurlGif from "../assets/gifs/seated-dumbbell-wrist-curl.gif";
import dumbbellReverseCurlGif from "../assets/gifs/dumbbell-reverse-curl.gif";
import dumbbellPronationSupinationGif from "../assets/gifs/dumbbell-pronation-supination.gif";
import farmersCarryGif from "../assets/gifs/farmers-carry.gif";
import dumbbellDeadBugGif from "../assets/gifs/dumbbell-dead-bug.gif";

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
  "incline-dumbbell-press.gif": inclineDumbbellPressGif,
  "dumbbell-pullover.gif": dumbbellPulloverGif,
  "incline-dumbbell-fly.gif": inclineDumbbellFlyGif,
  "dumbbell-floor-press.gif": dumbbellFloorPressGif,
  "arnold-press.gif": arnoldPressGif,
  "seated-dumbbell-shoulder-press.gif": seatedDumbbellShoulderPressGif,
  "dumbbell-lateral-raise.gif": dumbbellLateralRaiseGif,
  "bent-over-reverse-fly.gif": bentOverReverseFlyGif,
  "close-grip-dumbbell-press.gif": closeGripDumbbellPressGif,
  "single-arm-triceps-extension.gif": singleArmTricepsExtensionGif,
  "dumbbell-tate-press.gif": dumbbellTatePressGif,
  "diamond-push-up.gif": diamondPushUpGif,
  "weighted-russian-twist.gif": weightedRussianTwistGif,
  "one-arm-dumbbell-row.gif": oneArmDumbbellRowGif,
  "renegade-row.gif": renegadeRowGif,
  "dumbbell-romanian-deadlift.gif": dumbbellRomanianDeadliftGif,
  "chest-supported-dumbbell-row.gif": chestSupportedDumbbellRowGif,
  "zottman-curl.gif": zottmanCurlGif,
  "incline-dumbbell-curl.gif": inclineDumbbellCurlGif,
  "cross-body-hammer-curl.gif": crossBodyHammerCurlGif,
  "dumbbell-drag-curl.gif": dumbbellDragCurlGif,
  "seated-dumbbell-wrist-curl.gif": seatedDumbbellWristCurlGif,
  "dumbbell-reverse-curl.gif": dumbbellReverseCurlGif,
  "dumbbell-pronation-supination.gif": dumbbellPronationSupinationGif,
  "farmers-carry.gif": farmersCarryGif,
  "dumbbell-dead-bug.gif": dumbbellDeadBugGif,
};

//rganizes muscle groups using the program ID
function preparePrograms(programs) {
    const preparedPrograms = {};

    programs.forEach((program) => {
        preparedPrograms[program.id] = program.muscleGroups;
    });

    return preparedPrograms;
}

//adds correct GIF file to every exercise
function prepareExercises(exercises) {
    return exercises.map((exercise) => ({
        ...exercise,
        gif: exerciseGifs[exercise.gif],
    }));
}

//loads initial data directly from dbjson
function getInitialWorkoutData() {
    return {
        programs: preparePrograms(database.programs),
        exercises: prepareExercises(database.exercises),
    };
}

//loads data from Api OR uses db.json if the request fails
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
