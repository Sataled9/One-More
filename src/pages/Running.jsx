import BottomMenu from "../components/BottomMenu";
import ExercisePreview from "../components/ExercisePreview";
import Header from "../components/Header";
import Timer from "../components/Timer";
import WorkoutDates from "../components/WorkoutDates";

//Displays running program, sessions, and selected warm-up
function Running({
  activeSession,
  activeWarmup,
  bottomMenuItems,
  completeRunning,
  dateCards,
  goBackToDashboard,
  isRunningCompleted,
  sessionCards,
  timer,
  warmupExerciseCards,
  warmupPreview,
}) {
  return (
    <div className="app-shell">
      <Header
        showBackArrow={true}
        onBack={goBackToDashboard}
      />

      <main className="running">
        <WorkoutDates cards={dateCards} />

        <section className="running__sessions" aria-label="Running sessions">
          {sessionCards.map((session) => (
            <button
              className={session.className}
              type="button"
              key={session.id}
              aria-pressed={session.isActive}
              onClick={session.onSelect}
            >
              <span className="running-session__day">{session.day}</span>
              <strong>{session.runType}</strong>
              <span>{session.distanceKm} km</span>
            </button>
          ))}
        </section>

        <section className="running__warmup" aria-label="Warm-up protocol">
          <h1>5 minute warm-up</h1>
          <p>
            {activeWarmup.workSeconds} seconds exercise · {activeWarmup.restSeconds} seconds recovery · {activeWarmup.rounds} rounds
          </p>
        </section>

        <ExercisePreview exercise={warmupPreview} />

        <section
          className="running__warmup-exercises"
          aria-label="Warm-up exercises"
        >
          {warmupExerciseCards.map((exercise) => (
            <button
              className={exercise.className}
              type="button"
              key={exercise.id}
              aria-pressed={exercise.isActive}
              onClick={exercise.onSelect}
            >
              {exercise.name}
            </button>
          ))}
        </section>

        <section className="running__details" aria-label="Selected running session">
          <div>
            <span>Running</span>
            <strong>{activeSession.runType}</strong>
          </div>

          <div>
            <span>Distance</span>
            <strong>{activeSession.distanceKm} km</strong>
          </div>

          <div>
            <span>Target time</span>
            <strong>{activeSession.targetTime || "No fixed time"}</strong>
          </div>
        </section>

        <button className="running__complete-button" type="button"
          disabled={isRunningCompleted} onClick={completeRunning}>
          {isRunningCompleted ? "Running completed" : "Complete running"}
        </button>

        <Timer
          daysRemaining={timer.daysRemaining}
          progressPercentage={timer.progressPercentage}
        />
      </main>

      <BottomMenu items={bottomMenuItems} />
    </div>
  );
}

export default Running;
