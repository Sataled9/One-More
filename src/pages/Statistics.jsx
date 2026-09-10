import Header from "../components/Header";
import BottomMenu from "../components/BottomMenu";

//Displays statistics calculated from saved activity history
function Statistics({ bottomMenuItems, chartPoints, completedExercises,
  completedWorkouts, goBack, runningDistance, runningGoal, runningUnit,
  workoutGoal }) {
  const points = chartPoints.map((point) => `${point.x},${point.y}`).join(" ");
  const areaPoints = `0,190 ${points} 330,190`;

  return (
    <div className="app-shell">
      <Header title="Statistics" showBackArrow={true} onBack={goBack} />
      <main className="statistics">
        <h1 className="visually-hidden">Statistics</h1>
        <section className="statistics__summary" aria-label="Weekly summary">
          <article className="statistic-card">
            <span className="statistic-card__icon">FIT</span>
            <div className="statistic-card__information">
              <h2>Completed workouts</h2>
              <p><strong>{completedWorkouts} / {workoutGoal}</strong></p>
            </div>
          </article>
          <article className="statistic-card">
            <span className="statistic-card__icon">EX</span>
            <div className="statistic-card__information">
              <h2>Completed exercises</h2>
              <p><strong>{completedExercises}</strong></p>
            </div>
          </article>
          <article className="statistic-card">
            <span className="statistic-card__icon">RUN</span>
            <div className="statistic-card__information">
              <h2>Running distance</h2>
              <p><strong>{runningDistance} / {runningGoal} {runningUnit}</strong></p>
            </div>
          </article>
        </section>

        <section className="statistics__chart" aria-labelledby="chart-title">
          <div className="statistics__chart-header">
            <h2 id="chart-title">Weekly progress</h2>
            <p><strong>{completedWorkouts}</strong><span>workouts</span></p>
          </div>
          <svg className="statistics-chart" viewBox="0 0 330 200" role="img">
            <line x1="0" y1="40" x2="330" y2="40" />
            <line x1="0" y1="110" x2="330" y2="110" />
            <line x1="0" y1="180" x2="330" y2="180" />
            <polygon className="statistics-chart__area" points={areaPoints} />
            <polyline className="statistics-chart__line" points={points} />
            {chartPoints.map((point) => (
              <circle className="statistics-chart__point" cx={point.x}
                cy={point.y} key={point.x} r="5" />
            ))}
          </svg>
          <div className="statistics__days" aria-hidden="true">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span>
            <span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </section>
      </main>
      <BottomMenu items={bottomMenuItems} />
    </div>
  );
}

export default Statistics;
