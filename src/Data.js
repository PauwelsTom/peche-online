export const playerState = {
    "Idle": 1,
    "Fishing": 2,
    "Biting": 3,
    "Catching": 4,
    "Message": 5,
};

export const getSprite = (ps) => {
    switch(ps) {
        case playerState.Idle:
            return "/Idle.png";
        case playerState.Fishing:
            return "/Fishing.png";
        case playerState.Biting:
            return "/Catching.png";
        case playerState.Message:
            return "/Fish.png";
        default:
            return "/Idle.png";
    }
}

export const gameDict = {
    "None": 0,
    "TunaBar": 1,
    "SmashBar": 2,
}