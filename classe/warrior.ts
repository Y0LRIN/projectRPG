import { Character } from '../Character.ts';

export class Warrior extends Character {
    constructor() {
        super('Warrior', 12, 5, 8, 20, 25, 25);
    }
    
    // Berserk deals 30% more damage to a random enemy but takes 20% of max health as damage
    public berserk(enemies: Character[]) {
        if (!this.isAlive()) {
            console.log(`${this.name} is dead and cannot attack!`);
            return;
        }
        const aliveEnemies = enemies.filter(enemy => enemy.isAlive());
        if (aliveEnemies.length === 0) {
            console.log(`There are no alive enemies to attack!`);
            return;
        }
        const target = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
        let damage = Math.floor(this.ATK * 1.3 - target.DEF);
        if (damage <= 0) {
            damage = 2;
        }
        target.currenthealth -= damage;
        if (target.currenthealth < 0) {
            target.currenthealth = 0;
        }
        this.currenthealth -= this.maxHealth * 0.2;
        if (this.currenthealth < 0) {
            this.currenthealth = 0;
        }
        console.log(`${this.name} berserks and attacks ${target.name} for ${damage} damage!`);
        console.log(`${this.name} takes 20% of max health as damage!`);
    }
}