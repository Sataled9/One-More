import Header from "../components/Header";
import BottomMenu from "../components/BottomMenu";
import WorkoutCard from "../components/WorkoutCard";

import fitnessIcon from "../assets/icons/fitness.svg";
import runningIcon from "../assets/icons/running.png";
import hiitIcon from "../assets/icons/hiit.svg";

function Dashboard({ onNavigate }) {
  function openFitnessPage() {
    onNavigate("fitness");
  }

  return (
    <div className="app-shell">
      <Header />

      <main className="dashboard">
        <h1 className="visually-hidden">Dashboard</h1>

        <section className="dashboard__workouts" aria-label="Trenning">
          <WorkoutCard
            icon={fitnessIcon}
            title="Fitness"
            badge="8+"
            isActive={true}
            onClick={openFitnessPage}
          />

          <WorkoutCard
            icon={runningIcon}
            title="Running"
            badge="3+"
            isActive={false}
          />

          <WorkoutCard
            icon={hiitIcon}
            title="Hiit"
            badge="4+"
            isActive={false}
          />

          <button
            className="dashboard__add-button"
            type="button"
            aria-label="Add activity"
            disabled
          >
            +
          </button>
        </section>

        <section className="dashboard__today" aria-labelledby="today-title">
          <h2 id="today-title" className="visually-hidden">
            Activity of the day
          </h2>

          <article className="today-card">
            <div className="today-card__name">
              <img src={runningIcon} alt="Running" />
              <span>Fast Running</span>
            </div>

            <p className="today-card__value">
              <strong>10</strong>
              <span>km</span>
            </p>
          </article>

          <article className="today-card">
            <div className="today-card__name">
              <img src={hiitIcon} alt="" />
              <span>Hiit</span>
            </div>

            <p className="today-card__value">
              <strong>40</strong>
              <span>min</span>
            </p>
          </article>
        </section>
      </main>

      <BottomMenu activeItem="home" onNavigate={onNavigate} />
    </div>
  );
}

export default Dashboard;
