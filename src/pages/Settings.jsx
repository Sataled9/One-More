import Header from "../components/Header";
import BottomMenu from "../components/BottomMenu";

//Displays settings list and opens the selected settings section
function Settings({
  activeFitnessProgram,
  activeRunningProgram,
  activeSettingsSection,
  activities,
  activityCount,
  bottomMenuItems,
  changeSetting,
  clearActivities,
  goBack,
  openSettingsSection,
  resetProgress,
  saveSettings,
  savedMessage,
  settings,
}) {
  const settingsItems = [
    { id: "profile", label: "Profile and goals" },
    { id: "programs", label: "Program settings" },
    { id: "notifications", label: "Notifications" },
    { id: "data", label: "Your Data" },
  ];

  return (
    <div className="app-shell">
      <Header title="Settings" showBackArrow={true} onBack={goBack} />

      <main className="settings">
        <h1 className="visually-hidden">Settings</h1>

        {!activeSettingsSection && (
          <section className="settings__list" aria-label="Application settings">
            {settingsItems.map((item) => (
              <button
                className="settings__item"
                type="button"
                key={item.id}
                onClick={() => openSettingsSection(item.id)}
              >
                <span>{item.label}</span>
                <span className="settings__arrow" aria-hidden="true"></span>
              </button>
            ))}
          </section>
        )}

        {activeSettingsSection === "profile" && (
          <section className="settings__details">
            <h2>Profile and goals</h2>
            <label>Name<input name="name" value={settings.name} onChange={changeSetting} /></label>
            <label>Weight<input min="0" name="weight" type="number" value={settings.weight} onChange={changeSetting} /></label>
            <label>Weekly workout goal<input min="1" name="weeklyWorkoutGoal" type="number" value={settings.weeklyWorkoutGoal} onChange={changeSetting} /></label>
            <label>Weekly running goal in km<input min="1" name="weeklyRunningGoalKm" type="number" value={settings.weeklyRunningGoalKm} onChange={changeSetting} /></label>
            <button className="settings__save-button" type="button" onClick={saveSettings}>Save</button>
          </section>
        )}

        {activeSettingsSection === "programs" && (
          <section className="settings__details">
            <h2>Program settings</h2>
            <p><strong>Active Fitness:</strong> {activeFitnessProgram}</p>
            <p><strong>Active Running:</strong> {activeRunningProgram}</p>
            <label>Fitness start date<input name="fitnessStartDate" type="date" value={settings.fitnessStartDate} onChange={changeSetting} /></label>
            <label>Running start date<input name="runningStartDate" type="date" value={settings.runningStartDate} onChange={changeSetting} /></label>
            <button className="settings__save-button" type="button" onClick={saveSettings}>Save</button>
          </section>
        )}

        {activeSettingsSection === "notifications" && (
          <section className="settings__details">
            <h2>Notifications</h2>
            <label className="settings__check"><span>Enabled</span><input checked={settings.notificationsEnabled} name="notificationsEnabled" type="checkbox" onChange={changeSetting} /></label>
            <label>Time<input name="notificationTime" type="time" value={settings.notificationTime} onChange={changeSetting} /></label>
            <label className="settings__check"><span>Only on workout days</span><input checked={settings.workoutDaysOnly} name="workoutDaysOnly" type="checkbox" onChange={changeSetting} /></label>
            <button className="settings__save-button" type="button" onClick={saveSettings}>Save</button>
          </section>
        )}

        {activeSettingsSection === "data" && (
          <section className="settings__details">
            <h2>Your Data</h2>
            <p>{activityCount} saved activities</p>
            {activities.length === 0 && <p>No completed activities yet</p>}
            <div className="settings__history">
              {activities.map((activity) => (
                <article key={activity.id}>
                  <strong>{activity.type === "fitness" ? "Fitness" : activity.runType}</strong>
                  <span>{activity.date}</span>
                  <span>{activity.programName}</span>
                </article>
              ))}
            </div>
            <button className="settings__secondary-button" type="button" onClick={clearActivities}>Delete history</button>
            <button className="settings__secondary-button" type="button" onClick={resetProgress}>Reset progress</button>
          </section>
        )}

        {savedMessage && <p className="settings__message">{savedMessage}</p>}
      </main>

      <BottomMenu items={bottomMenuItems} />
    </div>
  );
}

export default Settings;
