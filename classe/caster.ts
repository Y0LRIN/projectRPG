import { Character } from '../Character.ts';

export class Caster extends Character {
    public maxMana : number;
    public currentMana : number;  
    private attackMagic : number;

    constructor() {
        super('Caster', 5, 4, 9, 20, 20, 20,);
        this.maxMana = 25;
        this.currentMana = 25;
        this.attackMagic = 12;

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
        if (damage <= 0) {
            damage = 1;
        }
        target.currenthealth -= damage;
        if (target.currenthealth < 0) {
            target.currenthealth = 0;
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
        
        if (this.currentMana < 8) {
            console.log(`${this.name} does not have enough mana!`);
            return;
        }
        
        this.currentMana -= 8;
        let damage = this.attackMagic;
        target.currenthealth -= damage;
        if (target.currenthealth < 0) {
            target.currenthealth = 0;
        }
        console.log(`${this.name} casts a spell on ${target.name} for ${damage} damage!`);
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
