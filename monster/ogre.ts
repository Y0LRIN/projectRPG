import { Character } from "../Character.ts";

export class ogre extends Character {
  constructor() {
    super("ogre", 16, 10, 2 ,50 ,20 ,20);
  }

  public specialAttack(targets: Character[]) {
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
    if (damage <= 0) {
        damage = 1;
    }
    targetEnemy.currenthealth -= damage;
    if (targetEnemy.currenthealth < 0) {
        targetEnemy.currenthealth = 0;
    }
    console.log(`${this.name} attacks ${targetEnemy.name} for ${damage} damage!`);
  }
}