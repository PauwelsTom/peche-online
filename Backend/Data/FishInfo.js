import { Fish_type } from "../../Utils/Fish.js"; // Adapte le chemin si besoin

export const rarity = {
    "Common": 100,
    "Uncommon": 50,
    "Rare": 25,
    "Epic": 10,
    "Legendary": 5,
    "Godly": 1,
    "Error": 0,
}

export const PoissonDict = {
    "Anchois":    new Fish_type("Anchois",    rarity.Common,     10, 15, 0.1, 0.3, 1),
    "Bar":        new Fish_type("Bar",        rarity.Common,     20, 40, 0.5, 2.5, 1.1),
    "Colin":      new Fish_type("Colin",      rarity.Common,     30, 50, 1.0, 2.0, 1.3),
    "Hareng":     new Fish_type("Hareng",     rarity.Common,     15, 25, 0.2, 0.6, 1.5),
    "Merlan":     new Fish_type("Merlan",     rarity.Common,     25, 40, 0.6, 1.5, 1.7),
    "Eperlan":    new Fish_type("Eperlan",    rarity.Common,     10, 20, 0.1, 0.4, 1.9),
    "Cabillau":   new Fish_type("Cabillau",   rarity.Common,     30, 50, 1.0, 3.5, 2),

    "Rouget":     new Fish_type("Rouget",     rarity.Uncommon,   15, 25, 0.3, 0.8, 4),
    "Dorade":     new Fish_type("Dorade",     rarity.Uncommon,   25, 45, 0.8, 2.8, 5),
    "Maqueraux":  new Fish_type("Maqueraux",  rarity.Uncommon,   20, 35, 0.4, 1.2, 6),

    "Lotte":      new Fish_type("Lotte",      rarity.Rare,       40, 80, 2.0, 8.0, 11),
    "Sole":       new Fish_type("Sole",       rarity.Rare,   20, 35, 0.5, 1.0, 15),
    "Turbo":      new Fish_type("Turbo",      rarity.Rare,       30, 60, 1.5, 4.0, 18),

    "Saumon":     new Fish_type("Saumon",     rarity.Epic,       40, 70, 2.5, 6.0, 25),
    "Raie":       new Fish_type("Raie",       rarity.Epic,       60, 120, 5.0, 15.0, 30),

    "Requin":     new Fish_type("Requin",     rarity.Legendary, 100, 300, 50, 300, 100),

    "Error":      new Fish_type("Error",      rarity.Error,       0, 0, 0, 0, 0)
};
