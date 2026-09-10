//Presentation component for displaying the program countdown
function Timer({
    daysRemaining,
    progressPercentage,
    title = "Program change",
}) {
    return (
        <section className="program-timer" aria-label="Program countdown">
            <div className="program-timer__text">
                <p className="program-timer__title">{title}</p>
                <p className="program-timer__value">{daysRemaining} days remaining</p>
            </div>

            <div className="program-timer__track" aria-hidden="true">
                <span
                   className="program-timer__progress"
                   style={{ width: `${progressPercentage}%`}}
                ></span>
            </div>
        </section>
    );
}

export default Timer;
