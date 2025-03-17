import { Character } from '../Character';

class Warrior extends Character {
    constructor(name: string) {
        super(name, 10, 10, 5, 20, 100, 20, 20);
    }
}