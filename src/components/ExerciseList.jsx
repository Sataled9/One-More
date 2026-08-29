//Presentation component for displaying exercises for the selected muscle group

import ExerciseCard from "./ExerciseCard";

function ExerciseList({ muscleGroup, exercises }) {
  return (
    <section
      className="fitness__exercise-list"
      aria-labelledby="exercise-list-title"
    >
      <h2 id="exercise-list-title">{muscleGroup} exercises</h2>

      {exercises.map((exercise) => (
        <ExerciseCard
          key={exercise.id}
          name={exercise.name}
          details={exercise.details}
          weight={exercise.weight}
          isCompleted={exercise.isCompleted}
          onSelect={exercise.onSelect}
          onToggleCompleted={exercise.onToggleCompleted}
        />
      ))}
    </section>
  );
}

export default ExerciseList;
