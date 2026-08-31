//Program duration: 8 weeks
const PROGRAM_DURATION_DAYS = 56;

//Daate when the current program started
const PROGRAM_START_DATE = new Date(2026, 7, 1);

function getProgramTimer(currentDate = new Date()) {
  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  const elapsedMilliseconds =
    currentDate.getTime() - PROGRAM_START_DATE.getTime();

  const elapsedDays = Math.floor(
    elapsedMilliseconds / millisecondsPerDay,
  );

  const daysRemaining = Math.max(
    PROGRAM_DURATION_DAYS - elapsedDays,
    0,
  );

  const progressPercentage = Math.min(
    (elapsedDays / PROGRAM_DURATION_DAYS) * 100,
    100,
  );

  return {
    daysRemaining,
    progressPercentage,
  };
}

export default getProgramTimer;