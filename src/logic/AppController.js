import { useState } from "react";

import Dashboard from "../pages/Dashboard";
import Fitness from "../pages/Fitness";
import Statistics from "../pages/Statistics";
import Settings from "../pages/Settings";

import { getBottomMenuItems } from "./PresentationHelpers";

import useDashboardController from "./DashboardController";
import useFitnessController from "./FitnessController";
import usePageController from "./PageController";

// Main controller for application navigation
function useAppController() {
  const [currentPage, setCurrentPage] = useState("dashboard");

//Prepares the data and actions required by each page
  const dashboardController =
    useDashboardController(navigateToPage);

  const fitnessController =
    useFitnessController(navigateToPage);

  const statisticsController =
    usePageController(navigateToPage, "fitness");

  const settingsController =
    usePageController(navigateToPage, "statistics");

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

    statistics: {
      Component: Statistics,
      props: {
        goBack: statisticsController.goBack,
        bottomMenuItems: getBottomMenuItems(
          "statistics",
          navigateToPage,
        ),
      },
    },

    settings: {
      Component: Settings,
      props: {
        goBack: settingsController.goBack,
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