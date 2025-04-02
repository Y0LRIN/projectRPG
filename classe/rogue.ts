import { Character } from '../Character.ts';
import { ether, halfStar, healPotion, starShard } from '../items.ts';
import { Team } from '../team.ts';
import { adventurers } from '../team.ts';

class Rogue extends Character {
    constructor() {
        super("Rogue", 8, 5, 16, 20, 20, 20);
    }

    public steal() {
        const roll = Math.floor(Math.random() *100);
        if (roll >= 40 && roll < 70) {
            console.log("You stole a healing potion!");
            adventurers.addToInventory(healPotion);
        } else if (roll >= 70 && roll < 85) {
            console.log("You stole a Star shard!");
            adventurers.addToInventory(starShard);
        } else if (roll >= 85 && roll < 95) {
            console.log("You stole an ether!");
            adventurers.addToInventory(ether);
        } else if (roll >= 95) {
            console.log("You stole a half Star!!!");
            adventurers.addToInventory(halfStar);
        } else {
            console.log('You failed to steal anything.');
        }
    }
}