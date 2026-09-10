import { useState } from "react";

import Dashboard from "../pages/Dashboard";
import Fitness from "../pages/Fitness";
import Running from "../pages/Running";
import Statistics from "../pages/Statistics";
import Settings from "../pages/Settings";

import { getBottomMenuItems } from "./presentationHelpers";

import useDashboardController from "./useDashboardController";
import useFitnessController from "./useFitnessController";
import useActivityController from "./useActivityController";
import useRunningController from "./useRunningController";
import useSettingsController from "./useSettingsController";
import useStatisticsController from "./useStatisticsController";

//Main controller for application navigation
function useAppController() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  const activityController = useActivityController();
  const settingsController = useSettingsController(navigateToPage);

//Prepares the data and actions required by each page
  const dashboardController =
    useDashboardController(navigateToPage, settingsController.settings);

  const fitnessController =
    useFitnessController(
      navigateToPage,
      settingsController.settings,
      activityController.saveActivity,
      activityController.activities,
    );

  const runningController =
    useRunningController(
      navigateToPage,
      settingsController.settings,
      activityController.saveActivity,
      activityController.activities,
    );

  const statisticsController = useStatisticsController(
    activityController.activities,
    settingsController.settings,
    navigateToPage,
  );

  //Resets saved history and the completed states on both workout pages
  async function resetProgress() {
    await activityController.clearActivities();
    fitnessController.resetFitnessProgress();
    runningController.resetRunningProgress();
    await settingsController.resetSettings();
  }

//Associates every page with component and properties
  const pages = {
    dashboard: {
      Component: Dashboard,
      props: {
        ...dashboardController,
        bottomMenuItems: getBottomMenuItems(
          "home",
          navigateToPage,
        ),
      },
    },

    fitness: {
      Component: Fitness,
      props: {
        ...fitnessController,
        bottomMenuItems: getBottomMenuItems(
          "fitness",
          navigateToPage,
        ),
      },
    },

    running: {
      Component: Running,
      props: {
        ...runningController,
        bottomMenuItems: getBottomMenuItems(
          "home",
          navigateToPage,
        ),
      },
    },

    statistics: {
      Component: Statistics,
      props: {
        ...statisticsController,
        bottomMenuItems: getBottomMenuItems(
          "statistics",
          navigateToPage,
        ),
      },
    },

    settings: {
      Component: Settings,
      props: {
        ...settingsController,
        activities: activityController.activities,
        activityCount: activityController.activities.length,
        clearActivities: activityController.clearActivities,
        resetProgress,
        bottomMenuItems: getBottomMenuItems(
          "settings",
          navigateToPage,
        ),
      },
    },
  };

  function navigateToPage(pageName) {
    if (pages[pageName]) {
      setCurrentPage(pageName);
    }
  }

  return {
    CurrentPage: pages[currentPage].Component,
    pageProps: pages[currentPage].props,
  };
}

export default useAppController;
