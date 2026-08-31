//Displays workout card using data prepared by the controller
function WorkoutCard({ icon, title, badge, className, disabled, ariaLabel, onClick }) {
  return (
    <button
      className={className}
      type="button"
      disabled={disabled}
      aria-label={ariaLabel}
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
