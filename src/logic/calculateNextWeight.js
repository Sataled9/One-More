//Calculates next weight based on exercise completion
function calculateNextWeight(
    currentWeight,
    isCompleted,
    weightDifference,
) {
    
//Returns original value when the data issinvalid
    if (
        typeof currentWeight !== "number" ||
        typeof weightDifference !== "number"
    ) {
        return currentWeight;
    }

//Increases the weight after a completed exercise
    if (isCompleted) {
        return currentWeight + weightDifference;
    }

//Decreases the weight without allowing negative values
    return Math.max(0, currentWeight - weightDifference);
}

export default calculateNextWeight;