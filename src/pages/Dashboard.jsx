// Displays workout cards, daily activities, the application header, and bottom navigation
import Header from "../components/Header";
import BottomMenu from "../components/BottomMenu";
import WorkoutList from "../components/WorkoutList";

function Dashboard({ workoutCards, dailyActivities, bottomMenuItems }) {
  return (
    <div className="app-shell">
      <Header />

      <main className="dashboard">
        <h1 className="visually-hidden">Dashboard</h1>

        <section className="dashboard__workouts" aria-label="Training">
          <WorkoutList cards={workoutCards} />

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

          {dailyActivities.map((activity) => (
            <article className="today-card" key={activity.id}>
              <div className="today-card__name">
                <img src={activity.icon} alt="" />
                <span>{activity.title}</span>
              </div>

              <p className="today-card__value">
                <strong>{activity.value}</strong>
                <span>{activity.unit}</span>
              </p>
            </article>
          ))}
        </section>
      </main>

      <BottomMenu items={bottomMenuItems} />
    </div>
  );
}

export default Dashboard;