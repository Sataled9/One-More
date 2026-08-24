function calculateNextWeight(
    currentWeight,
    isCompleted,
    weightDifference,
) {
    if (
        typeof currentWeight !== "number" ||
        typeof weightDifference !== "number"
    ) {
        return currentWeight;
    }

    if (isCompleted) {
        return currentWeight + weightDifference;
    }

    return Math.max(0, currentWeight - weightDifference);
}

export default calculateNextWeight;