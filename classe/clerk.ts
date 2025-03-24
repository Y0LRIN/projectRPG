import { Character } from "../Character";

class Clerk extends Character {
    private maxMana: number;
    private currentMana: number;
    private healMagic: number;
    
    constructor() {
        super('Clerk', 20, 20, 20, 20, 20, 20);
        this.maxMana = 20;
        this.currentMana = 20;
        this.healMagic = 10;
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
        let damage = this.ATK - target.DEF;
        target.currenthealth -= damage;
        if (target.currenthealth < 0) {
            target.currenthealth = 0;
        }
        console.log(`${this.name} attacks ${target.name} for ${damage} damage!`);
    }
protected magicHeal(target: Character): void {

    if (!this.isAlive()) {
    console.log(`${this.name} is dead and cannot heal!`);
    return;
}
if (!target.isAlive()) {
    console.log(`${target.name} is already healing!`);
    return;
}
if (this.currentMana < 10) {
    console.log(`${this.name} does not have enough mana to heal!`);
    return;
this.currentMana -= 10;
let heal = Math.min(target.maxHealth - target.currenthealth, this.healMagic);
target.currenthealth += heal;
console.log(`${this.name} heals ${target.name} for ${heal} health!`);

}
}
}