import fitnessIcon from "../assets/icons/fitness.svg";
import runningIcon from "../assets/icons/running.svg";
import hiitIcon from "../assets/icons/hiit.svg";

import { getWorkoutCardPresentation } from "./presentationHelpers";
import {
  getInitialRunningData,
  getRunningProgramTimer,
} from "./runningService";

//Manages the Dashboard workout cards and daily activities
function useDashboardController(onNavigation, settings) {
  const currentDay = new Date().getDay();

  function openFitnessPage() {
    onNavigation("fitness");
  }

  function openRunningPage() {
    onNavigation("running");
  }

  //These workout buttons always remain visible
  const cards = [
    {
      id: "fitness",
      icon: fitnessIcon,
      title: "Fitness",
      badge: "8+",
      isActive: true,
      onClick: openFitnessPage,
    },
    {
      id: "running",
      icon: runningIcon,
      title: "Running",
      badge: "3+",
      isActive: true,
      onClick: openRunningPage,
    },
    {
      id: "hiit",
      icon: hiitIcon,
      title: "Hiit",
      badge: "4+",
      isActive: false,
    },
  ];

  const workoutCards = cards.map((card) => ({
    ...card,
    ...getWorkoutCardPresentation(card.title, card.isActive),
  }));

  const fitnessActivity = {
    id: "fitness",
    icon: fitnessIcon,
    title: "Fitness",
    value: "8+",
    unit: "exercises",
  };

  const activeRunningProgramId = getRunningProgramTimer(
    new Date(),
    settings.runningStartDate,
  ).activeCycle;
  const runningData = getInitialRunningData();
  const todayRunningSession = runningData.sessions.find(
    (session) =>
      session.programId === activeRunningProgramId &&
      session.weekDay === currentDay,
  );

  const dailyActivities = [];

  if (currentDay === 1 || currentDay === 3 || currentDay === 5) {
    dailyActivities.push(fitnessActivity);
  }

  if (todayRunningSession) {
    dailyActivities.push({
      id: "warmup",
      icon: hiitIcon,
      title: "HIIT Warm-up",
      value: "5",
      unit: "min",
    });

    dailyActivities.push({
      id: "running",
      icon: runningIcon,
      title: todayRunningSession.runType,
      value: String(todayRunningSession.distanceKm),
      unit: "km",
    });
  }

  return { workoutCards, dailyActivities };
}

export default useDashboardController;
