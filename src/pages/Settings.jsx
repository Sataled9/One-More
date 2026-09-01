
import Header from "../components/Header";
import BottomMenu from "../components/BottomMenu";

//Displays application settings page
function Settings({ goBack, bottomMenuItems }) {
  return (
    <div className="app-shell">
      <Header
        title="Settings"
        showBackArrow={true}
        onBack={goBack}
      />

      <main className="settings">
        <h1 className="visually-hidden">Settings</h1>
        <section
          className="settings__list"
          aria-label="Fitness settings"
        >
          <button
            className="settings__item"
            type="button"
            disabled
          >
            <span>Notifications</span>
            <span
              className="settings__arrow"
              aria-hidden="true"
            ></span>
          </button>

          <button
            className="settings__item"
            type="button"
            disabled
          >
            <span>Security</span>
            <span
              className="settings__arrow"
              aria-hidden="true"
            ></span>
          </button>

          <button
            className="settings__item"
            type="button"
            disabled
          >
            <span>Preferences</span>
            <span
              className="settings__arrow"
              aria-hidden="true"
            ></span>
          </button>

          <button
            className="settings__item"
            type="button"
            disabled
          >
            <span>Your Data</span>
            <span
              className="settings__arrow"
              aria-hidden="true"
            ></span>
          </button>

          <button
            className="settings__item"
            type="button"
            disabled
          >
            <span>Sound</span>
            <span
              className="settings__arrow"
              aria-hidden="true"
            ></span>
          </button>

          <button
            className="settings__item"
            type="button"
            disabled
          >
            <span>Location</span>
            <span
              className="settings__arrow"
              aria-hidden="true"
            ></span>
          </button>
        </section>
      </main>

      <BottomMenu items={bottomMenuItems} />
    </div>
  );
}

export default Settings;