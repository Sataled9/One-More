import database from "../../database/db.json";

import fastWarmupGif from "../assets/gifs/fast-running-warmup.gif";
import buttKicksGif from "../assets/gifs/fast-running-butt-kicks.gif";
import jumpingJacksGif from "../assets/gifs/fast-running-jumping-jacks.gif";
import mountainClimbersGif from "../assets/gifs/fast-running-mountain-climbers.gif";
import slowWarmupGif from "../assets/gifs/slow-running-warmup.gif";
import marchInPlaceGif from "../assets/gifs/slow-running-march-in-place.gif";
import kneeRaisesGif from "../assets/gifs/slow-running-knee-raises.gif";
import legSwingsGif from "../assets/gifs/slow-running-leg-swings.gif";

const API_URL = "http://localhost:3000";
const RUNNING_PROGRAM_DURATION_DAYS = 7;
const RUNNING_PROGRAM_START_DATE = new Date(2026, 7, 1);

function getLocalDate(dateValue) {
  if (!dateValue) {
    return RUNNING_PROGRAM_START_DATE;
  }

  const [year, month, day] = dateValue.split("-").map(Number);
  return new Date(year, month - 1, day);
}

const warmupGifs = {
  "fast-running-warmup.gif": fastWarmupGif,
  "fast-running-butt-kicks.gif": buttKicksGif,
  "fast-running-jumping-jacks.gif": jumpingJacksGif,
  "fast-running-mountain-climbers.gif": mountainClimbersGif,
  "slow-running-warmup.gif": slowWarmupGif,
  "slow-running-march-in-place.gif": marchInPlaceGif,
  "slow-running-knee-raises.gif": kneeRaisesGif,
  "slow-running-leg-swings.gif": legSwingsGif,
};

//Changes the Running program every 7 day
function getRunningProgramTimer(
  currentDate = new Date(),
  startDate = "2026-08-01",
) {
  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  const elapsedMilliseconds =
    currentDate.getTime() - getLocalDate(startDate).getTime();

  const elapsedDays = Math.max(0, Math.floor(
    elapsedMilliseconds / millisecondsPerDay,
  ));

  const elapsedCycleDays =
    elapsedDays % RUNNING_PROGRAM_DURATION_DAYS;

  const activeCycle =
    Math.floor(elapsedDays / RUNNING_PROGRAM_DURATION_DAYS) % 2 + 1;

  const daysRemaining =
    RUNNING_PROGRAM_DURATION_DAYS - elapsedCycleDays;

  const progressPercentage =
    (elapsedCycleDays / RUNNING_PROGRAM_DURATION_DAYS) * 100;

  return {
    activeCycle,
    daysRemaining,
    progressPercentage,
  };
}

// Connects every running warm-up to its imported GIF
function prepareRunningData(programs, sessions, warmups) {
  return {
    programs,
    sessions,
    warmups: warmups.map((warmup) => ({
      ...warmup,
      exercises: warmup.exercises.map((exercise) => ({
        ...exercise,
        gif: warmupGifs[exercise.gif],
      })),
    })),
  };
}

//Loads initial running data directly from db.json
function getInitialRunningData() {
  return prepareRunningData(
    database.runningPrograms,
    database.runningSessions,
    database.runningWarmups,
  );
}

//Loads running data from json-server or uses db.json if it fails
async function getRunningData() {
  try {
    const programResponse = await fetch(`${API_URL}/runningPrograms`);
    const sessionResponse = await fetch(`${API_URL}/runningSessions`);
    const warmupResponse = await fetch(`${API_URL}/runningWarmups`);

    if (
      !programResponse.ok ||
      !sessionResponse.ok ||
      !warmupResponse.ok
    ) {
      throw new Error("Running data could not be loaded.");
    }

    const programs = await programResponse.json();
    const sessions = await sessionResponse.json();
    const warmups = await warmupResponse.json();

    return prepareRunningData(programs, sessions, warmups);
  } catch (error) {
    console.error(error);
    return getInitialRunningData();
  }
}

export {
  getInitialRunningData,
  getRunningData,
  getRunningProgramTimer,
};
