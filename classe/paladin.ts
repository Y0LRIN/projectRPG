import { Character } from "../Character";

class Paladin extends Character {
    constructor(name: string) {
        super(name, 7, 12, 8, 20, 25, 25);
    }

    public smite(targets: Character[]) {
        if (!this.isAlive()) {
            console.log(`${this.name} is dead and cannot attack!`);
            return;
        }
        const aliveEnemies = targets.filter(enemy => enemy.isAlive());
        if (aliveEnemies.length === 0) {
            console.log(`There are no alive enemies to attack!`);
            return;
        }
        const targetEnemy = aliveEnemies[Math.floor(Math.random() * aliveEnemies.length)];
        let damage = this.ATK * 1.5 - targetEnemy.DEF;
        targetEnemy.currenthealth -= damage;
        if (targetEnemy.currenthealth < 0) {
            targetEnemy.currenthealth = 0;
        }
        console.log(`${this.name} smites ${targetEnemy.name} for ${damage} damage!`);
    }
}