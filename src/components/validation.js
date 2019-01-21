export const validateCount = (count) => {
    return count.length === 0 || (!Number.isInteger(count) && count >=0 && count <= 15)
};

export const validateName = (name) => {
    return !(name.length === 0)
};

export const validateBounds = (lowerBound, upperBound) => {
    let lowerIsEmpty = lowerBound.length === 0
    let upperIsEmpty = upperBound.length === 0
    let lower = lowerIsEmpty || !Number.isNaN(lowerBound);
    let upper = upperIsEmpty || !Number.isNaN(upperBound);
    if(upper && lower) 
        lower = upper = (lowerBound <= upperBound);
    return {
        lower,
        upper
    }
};

export const validateEditBounds = (lowerBound, upperBound) => {
    let lowerIsEmpty = lowerBound.length === 0
    let upperIsEmpty = upperBound.length === 0
    let lower = !lowerIsEmpty && !Number.isNaN(lowerBound);
    let upper = !upperIsEmpty && !Number.isNaN(upperBound);
    if(upper && lower) 
        lower = upper = (lowerBound <= upperBound);
    return {
        lower,
        upper
    }
}