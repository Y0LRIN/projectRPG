import { Character } from '../Character.ts';

export class Caster extends Character {
    private maxMana : Number;
    private currentMana : Number;  
    private attackMagic : Number;

    constructor() {
        super('Caster', 4, 5, 10, 25, 20, 20,);
        this.maxMana = 20;
        this.currentMana = 20;
        this.attackMagic = 10;

    }
public attack(target: Character): void {
    if (!this.isAlive()) {
        console.log(`${this.name} is dead and cannot attack!`);
        return;
    }
    if (!target.isAlive()) {
        console.log(`${target.name} is already dead!`);
        return;
    }
    
    let damage = Math.max(this.ATK - target.DEF, 0);
     let result = target.currenthealth - damage;
    if (result < 0) {
        target.currenthealth = 0;
    }
    else {
        target.currenthealth = result;
    }
    console.log(`${this.name} attacks ${target.name} for ${damage} damage!`);

}

public DamageMagic(target: Character): void {
    if (!this.isAlive()) {
        console.log(`${this.name} is dead and cannot attack!`);
        return;
    }
    if (!target.isAlive()) {
        console.log(`${target.name} is already dead!`);
        return;
    }
    
}
    public RestoreMana(manaAmount) {
        if (this.currentMana === this.maxMana) {
            console.log(`${this.name} already has maximum mana!`);
            return;
        }
        if (this.currentMana + manaAmount > this.maxMana) {
            this.currentMana = this.maxMana;
        }
        else {
            this.currentMana += manaAmount;
        }
        console.log(`${this.name} restores ${manaAmount} mana!`);
    }
}
