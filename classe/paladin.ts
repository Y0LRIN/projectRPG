import { Character } from "../Character.ts";

export class Paladin extends Character {
    constructor() {
        super('Paladin', 8, 9, 7, 20, 25, 25);
    }

    // Special attack that can be used to attack multiple targets
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
        aliveEnemies.forEach(targetEnemy => {
            let damage = Math.floor(this.ATK * 0.4 - targetEnemy.DEF);
            if (damage <= 0) {
                damage = 1;
            }
            targetEnemy.currenthealth -= damage;
            if (targetEnemy.currenthealth < 0) {
                targetEnemy.currenthealth = 0;
            }
            console.log(`${this.name} smites ${targetEnemy.name} for ${damage} damage!`);
        });
    }
}