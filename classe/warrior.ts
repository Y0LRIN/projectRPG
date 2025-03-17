import { Character } from '../Character';

class Warrior extends Character {
    constructor(name: string) {
        super(name, 10, 3, 12, 20, 25, 25);
    }
    
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
        let damage = this.ATK * 1.3 - target.DEF;
        target.currenthealth -= damage;
        if (target.currenthealth < 0) {
            target.currenthealth = 0;
        }
        let selfDamage = this.maxHealth * 0.2;
        this.currenthealth -= selfDamage;
        if (this.currenthealth < 0) {
            this.currenthealth = 0;
        }
        console.log(`${this.name} hits ${target.name} for ${damage} damage!`);
        console.log(`${this.name} takes ${selfDamage} damage from the attack!`);
    }
}