import Header from "../components/Header";
import BottomMenu from "../components/BottomMenu";

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

                <section className="settings__lits" aria-label="Fitess Settings">
                    <button className="settings__item" type="button" aria-disabled="true">
                        <span>Notification</span>
                        <span className="settings-arrow" aria-hidden="true"></span>
                    </button>

                    <button className="settings__item" type="button" aria-disabled="true">
                        <span>Securyt</span>
                        <span className="settings__arrow" type="button" aria-disabled="true"></span>
                    </button>

                    <button className="settings__item" type="button" aria-disabled="true">
                        <span>Preference</span>
                        <span className="settings__arrow" type="button" aria-disabled="true"></span>
                    </button>

                    <button className="settings__item" type="button" aria-disabled="true">
                        <span>Your Data</span>
                        <span className="settings__arrow" type="button" aria-disabled="true"></span>
                    </button>

                    <button className="settings__item" type="button" aria-disabled="true">
                        <span>Sound</span>
                        <span className="settings__arrow" type="button" aria-disabled="true"></span>
                    </button>

                    <button className="settings__item" type="button" aria-disabled="true">
                        <span>Location</span>
                        <span className="settings__arrow" type="button" aria-disabled="true"></span>
                    </button>
                </section>
            </main>

            <BottomMenu items={bottomMenuItems} />
        </div>
    );
}

export default Settings;
