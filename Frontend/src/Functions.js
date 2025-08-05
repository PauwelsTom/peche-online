export const getRandom = (a, b) => {
    return Math.floor(Math.random() * (b - a)) + a;
};

export const getRandomf = (a, b) => {
    return Math.random() * (b - a + 1) + a;
};