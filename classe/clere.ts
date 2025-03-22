import { Character } from "../Character";

class Clere extends Character {
    private maxMana: number;
    private currentMana: number;
    private healMagic: number;
    
    constructor() {
        super('Clere', 20, 20, 20, 20, 20, 20);
        this.maxMana = 20;
        this.currentMana = 20;
        this.healMagic = 10;
    }
}

