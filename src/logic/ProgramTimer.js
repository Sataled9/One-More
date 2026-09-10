//Each workout program lasts 60 days
const PROGRAM_DURATION_DAYS = 60;
const TOTAL_PROGRAM_CYCLES = 2;

//Daaate when the current program started
const PROGRAM_START_DATE = new Date(2026, 7, 1);

function getLocalDate(dateValue) {
  if (!dateValue) {
    return PROGRAM_START_DATE;
  }

  const [year, month, day] = dateValue.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function getProgramTimer(
  currentDate = new Date(),
  startDate = "2026-08-01",
) {
  const millisecondsPerDay = 1000 * 60 * 60 * 24;

  const elapsedMilliseconds =
    currentDate.getTime() - getLocalDate(startDate).getTime();

  const elapsedDays = Math.max(0, Math.floor(
    elapsedMilliseconds / millisecondsPerDay,
  ));

  const activeCycle = Math.min(
    Math.floor(elapsedDays / PROGRAM_DURATION_DAYS) + 1,
    TOTAL_PROGRAM_CYCLES,
  );

  const elapsedCycleDays = Math.min(
    elapsedDays - (activeCycle - 1) * PROGRAM_DURATION_DAYS,
    PROGRAM_DURATION_DAYS,
  );

  const daysRemaining = Math.max(
    PROGRAM_DURATION_DAYS - elapsedCycleDays,
    0,
  );

  const progressPercentage =
    (elapsedCycleDays / PROGRAM_DURATION_DAYS) * 100;

  return {
    activeCycle,
    daysRemaining,
    progressPercentage,
  };
}

export default getProgramTimer;
