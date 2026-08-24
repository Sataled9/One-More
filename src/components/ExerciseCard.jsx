function ExerciseCard({
  name,
  sets,
  repetitions,
  durationSeconds,
  weight,
  isCompleted,
  onSelect,
  onToggleCompleted,
}) {

//Shows time for timed exercises and repetitions for others
  const exerciseDetails = durationSeconds
    ? `${sets} set x ${durationSeconds} seconds`
    : `${sets} sets x ${repetitions} repetitions`;

//Stops the checkbox click from also triggering card selection
  function changeCompletedState(event) {
    event.stopPropagation();
    onToggleCompleted();
  }

  return (
    <article className="exercise-card" onClick={onSelect}>
      <input
        className="exercise-card__checkbox"
        type="checkbox"
        checked={isCompleted}
        aria-label={`${name} completed`}
        onChange={changeCompletedState}
        onClick={(event) => event.stopPropagation()}
      />

      <div className="exercise-card__information">
        <h3 className="exercise-card__name">{name}</h3>
        <p className="exercise-card__details">{exerciseDetails}</p>
      </div>

      <p className="exercise-card__weight">{weight}</p>
    </article>
  );
}

export default ExerciseCard;
