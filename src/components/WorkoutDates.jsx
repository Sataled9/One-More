//Presentation component for displaying workout days
function WorkoutDates({ cards }) {
  return (
    <section className="fitness__dates" aria-label="Workout dates">
      {cards.map((day) => (
        <button
          className={day.className}
          type="button"
          key={day.id}
          disabled={day.isDisabled}
          aria-pressed={day.isActive}
          onClick={day.onSelect}
        >
          <span className="date-card__day">{day.shortName}</span>
          <span className="date-card__number">{day.number}</span>
        </button>
      ))}
    </section>
  );
}

export default WorkoutDates;
