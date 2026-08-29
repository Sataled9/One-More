//Presentation component for displaying the selected exercise

function ExercisePreview({ exercise }) {
  return (
    <section
      className="exercise-preview"
      aria-labelledby="current-exercise-title"
    >
      <img
        src={exercise.gif}
        alt={`Male athlete performing ${exercise.name}`}
      />

      <div className="exercise-preview__caption">
        <h2 id="current-exercise-title">{exercise.name}</h2>
      </div>
    </section>
  );
}

export default ExercisePreview;
