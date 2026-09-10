import { useEffect, useState } from "react";

import {
  defaultSettings,
  getSettings,
  updateSettings,
} from "./settingsService";
import getProgramTimer from "./programTimer";
import { getRunningProgramTimer } from "./runningService";
import {
  createWorkoutDays,
  getInitialWorkoutDay,
} from "./alternatePrograms";

//Manages editable profile, goals, dates, units, and notifications
function useSettingsController(onNavigation) {
  const [settings, setSettings] = useState(defaultSettings);
  const [savedMessage, setSavedMessage] = useState("");
  const [activeSettingsSection, setActiveSettingsSection] = useState(null);

  useEffect(() => {
    async function loadSettings() {
      setSettings(await getSettings());
    }

    loadSettings();
  }, []);

  //Shows one browser reminder while the app is open
  useEffect(() => {
    function showWorkoutReminder() {
      if (
        !settings.notificationsEnabled ||
        !("Notification" in globalThis) ||
        globalThis.Notification.permission !== "granted"
      ) {
        return;
      }

      const now = new Date();
      const isWorkoutDay = now.getDay() !== 0;
      const currentTime = now.toTimeString().slice(0, 5);
      const today = now.toISOString().slice(0, 10);
      const lastReminder = globalThis.localStorage.getItem(
        "oneMoreLastReminder",
      );

      if (
        currentTime >= settings.notificationTime &&
        (!settings.workoutDaysOnly || isWorkoutDay) &&
        lastReminder !== today
      ) {
        new globalThis.Notification("One More", {
          body: "Your workout is ready.",
        });
        globalThis.localStorage.setItem("oneMoreLastReminder", today);
      }
    }

    showWorkoutReminder();
    const reminderInterval = globalThis.setInterval(
      showWorkoutReminder,
      60000,
    );

    return () => globalThis.clearInterval(reminderInterval);
  }, [settings]);

  function changeSetting(event) {
    const { checked, name, type, value } = event.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
    setSavedMessage("");

    if (
      name === "notificationsEnabled" &&
      checked &&
      "Notification" in globalThis
    ) {
      globalThis.Notification.requestPermission();
    }
  }

  async function saveSettings() {
    const savedSettings = await updateSettings(settings);
    setSettings(savedSettings);
    setSavedMessage("Settings saved");
  }

  async function resetSettings() {
    const savedSettings = await updateSettings(defaultSettings);
    setSettings(savedSettings);
    setSavedMessage("Progress and settings reset");
  }

  function goBack() {
    if (activeSettingsSection) {
      setActiveSettingsSection(null);
      setSavedMessage("");
      return;
    }

    onNavigation("statistics");
  }

  function openSettingsSection(sectionName) {
    setActiveSettingsSection(sectionName);
    setSavedMessage("");
  }

  const fitnessCycle = getProgramTimer(
    new Date(),
    settings.fitnessStartDate,
  ).activeCycle;
  const runningCycle = getRunningProgramTimer(
    new Date(),
    settings.runningStartDate,
  ).activeCycle;
  const currentWorkoutDay = getInitialWorkoutDay(
    createWorkoutDays(new Date(), fitnessCycle),
  );
  const fitnessProgramNames = {
    1: "Strength Foundation - Section A",
    2: "Strength Foundation - Section B",
    3: "Strength Progression - Section C",
    4: "Strength Progression - Section D",
  };

  return {
    activeSettingsSection,
    changeSetting,
    goBack,
    openSettingsSection,
    activeFitnessProgram:
      fitnessProgramNames[currentWorkoutDay.programId],
    activeRunningProgram: `Running ${runningCycle === 1 ? "A" : "B"}`,
    resetSettings,
    saveSettings,
    savedMessage,
    settings,
  };
}

export default useSettingsController;
