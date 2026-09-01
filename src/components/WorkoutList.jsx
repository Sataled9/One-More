//Presentation component for displaying workout cards

import WorkoutCard from "./WorkoutCard";

function WorkoutList({ cards }) {
    return cards.map((card) => (
        <WorkoutCard
              key={card.id}
              icon={card.icon}
              title={card.title}
              badge={card.badge}
              className={card.className}
              disabled={card.disabled}
              ariaLabel={card.ariaLabel}
              onClick={card.onClick}
        />
    ));
}
export default WorkoutList;