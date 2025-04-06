import { Character } from "../Character.ts";

export class Knight extends Character {
    constructor() {
        super('Knight', 9, 10, 6, 20, 20, 20);
    }
    public attack(target: Character) {
        if (!this.isAlive()) {
            console.log(`${this.name} is dead and cannot attack!`);
            return;
        }
        if (!target.isAlive()) {
            console.log(`${target.name} is dead and cannot be attacked!`);
            return;
        }
        let damage = Math.floor(this.ATK - target.DEF);
        if (damage <= 0) {
            damage = 1;
        }
        target.currenthealth -= damage;
        if (target.currenthealth < 0) {
            target.currenthealth = 0;
        }
        console.log(`${this.name} attacks ${target.name} for ${damage} damage!`);
    }
}