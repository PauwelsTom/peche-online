export const getRandom = (a, b) => {
    return Math.floor(Math.random() * (b - a + 1)) + a;
};