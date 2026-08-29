//Presentation component for displaying muscle groups

function MuscleGroups({ activeDay, cards }) {
  return (
    <section
      className="fitness__muscles"
      aria-label={`${activeDay.shortName} muscle groups`}
    >
      {cards.map((muscleGroup) => (
        <button
          className={muscleGroup.className}
          type="button"
          key={muscleGroup.name}
          aria-pressed={muscleGroup.isActive}
          onClick={muscleGroup.onSelect}
        >
          <img src={muscleGroup.icon} alt="" />
          <span>{muscleGroup.name}</span>
        </button>
      ))}
    </section>
  );
}

export default MuscleGroups;
