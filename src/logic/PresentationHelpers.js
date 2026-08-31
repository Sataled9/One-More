import homeIcon from "../assets/icons/home.svg";
import heartIcon from "../assets/icons/heart.svg";
import statisticsIcon from "../assets/icons/statistics.svg";
import settingsIcon from "../assets/icons/settings.svg";

//Set active style for the selected menu item
function getNavigationItemClassName(activeItem, itemName) {
  return activeItem === itemName
    ? "bottom-menu__item bottom-menu__item--active"
    : "bottom-menu__item";
}

//Prepares the bottom navigation menu
function getBottomMenuItems(activeItem, onNavigation) {
  const items = [
    { name: "home", page: "dashboard", label: "Dashboard", icon: homeIcon },
    { name: "fitness", page: "fitness", label: "Fitness", icon: heartIcon },
    {
      name: "statistics",
      page: "statistics",
      label: "Statistics",
      icon: statisticsIcon,
    },
    {
      name: "settings",
      page: "settings",
      label: "Settings",
      icon: settingsIcon,
    },
  ];

  return items.map((item) => ({
    ...item,
    className: getNavigationItemClassName(activeItem, item.name),
    ariaCurrent: activeItem === item.name ? "page" : undefined,
    onSelect: () => onNavigation(item.page),
  }));
}

//Prepares style and accessibility data for workout cards
function getWorkoutCardPresentation(title, isActive) {
  return {
    className: isActive
      ? "workout-card workout-card--active"
      : "workout-card workout-card--inactive",
    disabled: !isActive,
    ariaLabel: `${title}, ${isActive ? "active" : "inactive"}`,
  };
}

//Sets active style for date cards
function getDateCardClassName(isActive) {
  return isActive ? "date-card date-card--active" : "date-card";
}

//Sets active style for muscle cards
function getMuscleCardClassName(isActive) {
  return isActive ? "muscle-card muscle-card--active" : "muscle-card";
}

//Creates exercise sets, repetitions or duration text
function getExerciseDetails(exercise) {
  return exercise.durationSeconds
    ? `${exercise.sets} set x ${exercise.durationSeconds} seconds`
    : `${exercise.sets} sets x ${exercise.repetitions} repetitions`;
}

export {
  getBottomMenuItems,
  getDateCardClassName,
  getExerciseDetails,
  getMuscleCardClassName,
  getNavigationItemClassName,
  getWorkoutCardPresentation,
};