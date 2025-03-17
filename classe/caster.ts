import { Character } from '../Character';

class Caster extends Character {
    private maxMana : Number;
    private currentMana : Number;  
    constructor() {
        super('Clere', 4, 5, 10, 25, 20, 20,); 
        this.maxMana = 20;
        this.currentMana = 20;

    }
}
