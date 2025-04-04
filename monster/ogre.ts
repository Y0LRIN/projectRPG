import { Character } from "../Character.ts";

class ogre extends Character {
  constructor() {
    super("ogre", 15, 14, 1,20,20,20);
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
    } else {
      target.currenthealth = result;
    }
    console.log(`${this.name} attacks ${target.name} for ${damage} damage!`);
  }
}