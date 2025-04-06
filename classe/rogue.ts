import { Character } from '../Character.ts';
import { ether, halfStar, healPotion, starShard } from '../items.ts';
import { Team } from '../team.ts';

export class Rogue extends Character {
    constructor() {
        super("Rogue", 10, 4, 12, 20, 20, 20);
    }

    // Steal add a random item to the team inventory
    public steal(team: Team): void {
        const roll = Math.floor(Math.random() *100);
        if (roll >= 40 && roll < 70) {
            console.log("You stole a healing potion!");
            team.addToInventory(healPotion);
        } else if (roll >= 70 && roll < 85) {
            console.log("You stole a Star shard!");
            team.addToInventory(starShard);
        } else if (roll >= 85 && roll < 95) {
            console.log("You stole an ether!");
            team.addToInventory(ether);
        } else if (roll >= 95) {
            console.log("You stole a half Star!!!");
            team.addToInventory(halfStar);
        } else {
            console.log('You failed to steal anything.');
        }
    }
}