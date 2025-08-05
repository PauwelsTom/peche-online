import { getRandomf } from "./Functions.js";

// Definit une classe depoisson, permet de recuperer un poisson d'un certain type mais avec des caracteristiques speciales
export class Fish_type {
    constructor(type, rarity, minSize, maxSize, minWeight, maxWeight, value) {
        this.type = type;
        this.rarity = rarity;
        this.minSize = minSize;
        this.maxSize = maxSize;
        this.minWeight = minWeight;
        this.maxWeight = maxWeight;
        this.value = value;
    }

    get_fish = () => {
        const size = getRandomf(this.minSize, this.maxSize);
        const weight = getRandomf(this.minWeight, this.maxWeight);
        return new Fish(this.type, size, weight, this.value);
    }
}


export class Fish {
    constructor(fish_type, size, weight, value) {
        this.fish_type = fish_type;
        this.size = size;
        this.weight = weight;
        this.value = value;
    }

    // Donne le prix en fonction du type 
    get_price = () => {
        return this.value * (0.6 * this.size + 0.4 * this.weight);
    }

    get_print = () => {
        return "Vous avez attrape un " + this.fish_type + " (" + this.size + "cm, " + this.weight + "kg)";
    }
}