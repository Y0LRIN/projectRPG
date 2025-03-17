import { Character } from '../Character';

class Warrior extends Character {
    constructor(name: string) {
        super(name, 10, 3, 12, 20, 25, 25);
    }
    
    public smite(enemies: Character[]) {
        if (!this.isAlive()) {
            console.log(`${this.name} is dead and cannot attack!`);
            return;
        }
        const aliveEnemies = enemies.filter(enemy => enemy.isAlive());
        if (aliveEnemies.length === 0) {
            console.log(`There are no alive enemies to attack!`);
            return;
        }
        for (const target of aliveEnemies) {
            let damage = (this.ATK - target.DEF) * 0.4;
            target.currenthealth -= damage;
            if (target.currenthealth < 0) {
                target.currenthealth = 0;
            }
            console.log(`${this.name} smites ${target.name} for ${damage} damage!`);
        }
    }
}