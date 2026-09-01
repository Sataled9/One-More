import fitnessIcon from "../assets/icons/fitness.svg";
import runningIcon from "../assets/icons/running.svg";
import hiitIcon from "../assets/icons/hiit.svg";

import { getWorkoutCardPresentation } from "./presentationHelpers";

//Manages workout cards displayed on Dashboard
function DashboardController(onNavigation) {
  // Opens the Fitness page
  function openFitnessPage() {
    onNavigation("fitness");
  }

//Stores info and availability of each workout
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
      isActive: false,
    },
    {
      id: "hiit",
      icon: hiitIcon,
      title: "Hiit",
      badge: "4+",
      isActive: false,
    },
  ];

//Add correct presentation properties to every workout card
  const workoutCards = cards.map((card) => ({
    ...card,
    ...getWorkoutCardPresentation(card.title, card.isActive),
  }));

  return { workoutCards };
}

export default DashboardController;