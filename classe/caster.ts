import { Character } from '../Character';

const caster = new Character('Caster', 20, 20, 20, 20);

class Caster extends Character {
    constructor() {
        super('Caster', 3, 5, 20, 20);
    }
}
