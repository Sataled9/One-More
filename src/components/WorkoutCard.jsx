// Active cards are selectable; inactive cards remain visible but disabled
function WorkoutCard({ icon, title, badge, isActive, onClick }) {
  const cardClassName = isActive
    ? "workout-card workout-card--active"
    : "workout-card workout-card--inactive";

  return (
    <button
      className={cardClassName}
      type="button"
      disabled={!isActive}
      aria-label={`${title}, ${isActive ? "active" : "inactive"}`}
      onClick={onClick}
    >
      <span className="workout-card__icon">
        <img src={icon} alt="" />
      </span>

      <span className="workout-card__title">{title}</span>
      <span className="workout-card__badge">{badge}</span>
    </button>
  );
}

export default WorkoutCard;
