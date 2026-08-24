function Timer() {
  const today = new Date();
  const currentDay = today.getDate();

//Gets total number of days in the current month
  const totalDaysInMonth = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    0,
  ).getDate();

    const daysRemaining = totalDaysInMonth - currentDay +1;

//Calculates how much of the month has passed for progress bar
    const progressPercentage = (currentDay / totalDaysInMonth) * 100;

    return (
        <section calssName="program-timer" aria-label="Program countdown">
            <div className="program-timer__text">
                <p className="program-timer__title">Program change</p>
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