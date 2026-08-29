 //Presentation component for displaying exercise information

function ExerciseCard({
  name,
  details,
  weight,
  isCompleted,
  onSelect,
  onToggleCompleted,
}) {
  return (
    <article className="exercise-card" onClick={onSelect}>
      <input
        className="exercise-card__checkbox"
        type="checkbox"
        checked={isCompleted}
        readOnly
        aria-label={`${name} completed`}
        onClick={onToggleCompleted}
      />

      <div className="exercise-card__information">
        <h3 className="exercise-card__name">{name}</h3>
        <p className="exercise-card__details">{details}</p>
      </div>

      <p className="exercise-card__weight">{weight}</p>
    </article>
  );
}

export default ExerciseCard;
