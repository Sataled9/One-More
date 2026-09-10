import Header from "../components/Header";
import BottomMenu from "../components/BottomMenu";
import ExerciseList from "../components/ExerciseList";
import ExercisePreview from "../components/ExercisePreview";
import MuscleGroups from "../components/MuscleGroups";
import Timer from "../components/Timer";
import WorkoutDates from "../components/WorkoutDates";

function Fitness({
  activeDay,
  activeExercise,
  activeMuscleGroup,
  bottomMenuItems,
  dateCards,
  exerciseCards,
  goBackToDashboard,
  muscleCards,
  programName,
  timer,
}) {
  return (
    <div className="app-shell">
      <Header
        title="Fitness"
        showBackArrow={true}
        onBack={goBackToDashboard}
      />

      <main className="fitness">
        <h1 className="visually-hidden">Fitness</h1>

        <WorkoutDates cards={dateCards} />
        <MuscleGroups activeDay={activeDay} cards={muscleCards} />
        <ExercisePreview exercise={activeExercise} />
        <ExerciseList
          muscleGroup={activeMuscleGroup}
          exercises={exerciseCards}
        />

        <Timer
          daysRemaining={timer.daysRemaining}
          progressPercentage={timer.progressPercentage}
          title={programName}
        />
      </main>

      <BottomMenu items={bottomMenuItems} />
    </div>
  );
}

export default Fitness;
