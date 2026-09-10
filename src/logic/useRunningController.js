import { useEffect, useState } from "react";

import {
  getInitialRunningData,
  getRunningData,
  getRunningProgramTimer,
} from "./runningService";
import { getDateCardClassName } from "./presentationHelpers";

const initialRunningData = getInitialRunningData();

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

//Returns the date of a running day in the current week
function getSessionDateId(weekDay, currentDate = new Date()) {
  const sessionDate = new Date(currentDate);

  sessionDate.setHours(12, 0, 0, 0);
  sessionDate.setDate(
    currentDate.getDate() + weekDay - currentDate.getDay(),
  );

  return formatDate(sessionDate);
}

//Selects today's session or the next planned running day
function getInitialSessionId(
  sessions,
  activeProgramId,
  currentDay = new Date().getDay(),
) {
  const programSessions = sessions.filter(
    (session) =>
      String(session.programId) === String(activeProgramId),
  );

  const todaySession = programSessions.find(
    (session) => session.weekDay === currentDay,
  );

  if (todaySession) {
    return todaySession.id;
  }

  const nextSession = programSessions.find(
    (session) => session.weekDay > currentDay,
  );

  return (nextSession || programSessions[0]).id;
}

//Selects first warm-Up exercise for a running session
function getInitialWarmupExerciseId(
  sessionId,
  sessions,
  warmups,
) {
  const session = sessions.find(
    (runningSession) =>
      String(runningSession.id) === String(sessionId),
  );

  const warmup = warmups.find(
    (runningWarmup) =>
      String(runningWarmup.id) === String(session.warmupId),
  );

  return warmup.exercises[0].id;
}

//Manages Running page data ad interactions
function useRunningController(
  onNavigation,
  settings,
  saveActivity,
  activities,
) {
  const timer = getRunningProgramTimer(
    new Date(),
    settings.runningStartDate,
  );

  const activeProgramId = timer.activeCycle;

  const initialSessionId = getInitialSessionId(
    initialRunningData.sessions,
    activeProgramId,
  );

  const [sessions, setSessions] = useState(
    initialRunningData.sessions,
  );

  const [warmups, setWarmups] = useState(
    initialRunningData.warmups,
  );

  const [activeSessionId, setActiveSessionId] = useState(
    initialSessionId,
  );

  const initialSession = initialRunningData.sessions.find(
    (session) =>
      String(session.id) === String(initialSessionId),
  );

  const [activeDateId, setActiveDateId] = useState(
    getSessionDateId(initialSession.weekDay),
  );

  const [activeWarmupExerciseId, setActiveWarmupExerciseId] =
    useState(
      getInitialWarmupExerciseId(
        initialSessionId,
        initialRunningData.sessions,
        initialRunningData.warmups,
      ),
    );

  const [completedSessionKeys, setCompletedSessionKeys] =
    useState([]);

  //Clears completed running sessions after a full progress reset
  function resetRunningProgress() {
    setCompletedSessionKeys([]);
  }

  //Loads the latest running data from json-server
  useEffect(() => {
    let isMounted = true;

    async function loadRunningData() {
      const runningData = await getRunningData();

      if (!isMounted) {
        return;
      }

      setSessions(runningData.sessions);
      setWarmups(runningData.warmups);

      const nextSessionId = getInitialSessionId(
        runningData.sessions,
        activeProgramId,
      );

      setActiveSessionId(nextSessionId);

      const nextSession = runningData.sessions.find(
        (session) =>
          String(session.id) === String(nextSessionId),
      );

      setActiveDateId(
        getSessionDateId(nextSession.weekDay),
      );

      setActiveWarmupExerciseId(
        getInitialWarmupExerciseId(
          nextSessionId,
          runningData.sessions,
          runningData.warmups,
        ),
      );
    }

    loadRunningData();

    return () => {
      isMounted = false;
    };
  }, [activeProgramId]);

  const programSessions = sessions.filter(
    (session) =>
      String(session.programId) === String(activeProgramId),
  );

  const activeSession =
    programSessions.find(
      (session) =>
        String(session.id) === String(activeSessionId),
    ) || programSessions[0];

  const activeWarmup = warmups.find(
    (warmup) =>
      String(warmup.id) === String(activeSession.warmupId),
  );

  const activeWarmupExercise =
    activeWarmup.exercises.find(
      (exercise) =>
        String(exercise.id) ===
        String(activeWarmupExerciseId),
    ) || activeWarmup.exercises[0];

  function selectSession(
    session,
    dateId = getSessionDateId(session.weekDay),
  ) {
    setActiveSessionId(session.id);
    setActiveDateId(dateId);

    setActiveWarmupExerciseId(
      getInitialWarmupExerciseId(
        session.id,
        sessions,
        warmups,
      ),
    );
  }

  const sessionCards = programSessions.map((session) => {
    const isActive =
      String(session.id) === String(activeSession.id);

    return {
      ...session,
      isActive,
      className: isActive
        ? "running-session running-session--active"
        : "running-session",
      onSelect: () => selectSession(session),
    };
  });

  //Creates same five-day date bar used on Fitness page
  const dateCards = [];
  const currentDate = new Date();

  for (
    let dayDifference = -2;
    dayDifference <= 2;
    dayDifference += 1
  ) {
    const date = new Date(currentDate);

    date.setHours(12, 0, 0, 0);
    date.setDate(
      currentDate.getDate() + dayDifference,
    );

    const dateId = formatDate(date);

    const session = programSessions.find(
      (runningSession) =>
        runningSession.weekDay === date.getDay(),
    );

    const isActive = dateId === activeDateId;

    dateCards.push({
      id: dateId,
      shortName: [
        "Sun",
        "Mon",
        "Tue",
        "Wed",
        "Thu",
        "Fri",
        "Sat",
      ][date.getDay()],
      number: date.getDate(),
      isActive,
      className: getDateCardClassName(isActive),
      isDisabled: !session,
      onSelect: () =>
        session && selectSession(session, dateId),
    });
  }

  const warmupExerciseCards =
    activeWarmup.exercises.map((exercise) => {
      const isActive =
        String(exercise.id) ===
        String(activeWarmupExercise.id);

      return {
        ...exercise,
        isActive,
        className: isActive
          ? "warmup-exercise warmup-exercise--active"
          : "warmup-exercise",
        onSelect: () =>
          setActiveWarmupExerciseId(exercise.id),
      };
    });

  const warmupPreview = {
    name: activeWarmupExercise.name,
    gif: activeWarmupExercise.gif,
  };

  function goBackToDashboard() {
    onNavigation("dashboard");
  }

  function completeRunning() {
    const date = activeDateId;
    const sessionKey = `${date}-${activeSession.id}`;

    if (
      completedSessionKeys.includes(sessionKey) ||
      activities.some(
        (activity) =>
          activity.type === "running" &&
          activity.date === date &&
          String(activity.sessionId) ===
            String(activeSession.id),
      )
    ) {
      return;
    }

    saveActivity({
      date,
      type: "running",
      programId: activeProgramId,
      programName: `Running ${
        Number(activeProgramId) === 1 ? "A" : "B"
      }`,
      sessionId: activeSession.id,
      runType: activeSession.runType,
      distanceKm: activeSession.distanceKm,
      completedExercises:
        activeWarmup.exercises.length,
    });

    setCompletedSessionKeys([
      ...completedSessionKeys,
      sessionKey,
    ]);
  }

  const isRunningCompleted =
    completedSessionKeys.includes(
      `${activeDateId}-${activeSession.id}`,
    ) ||
    activities.some(
      (activity) =>
        activity.type === "running" &&
        activity.date === activeDateId &&
        String(activity.sessionId) ===
          String(activeSession.id),
    );

  return {
    activeSession,
    activeWarmup,
    completeRunning,
    dateCards,
    goBackToDashboard,
    isRunningCompleted,
    resetRunningProgress,
    sessionCards,
    timer,
    warmupExerciseCards,
    warmupPreview,
  };
}

export default useRunningController;