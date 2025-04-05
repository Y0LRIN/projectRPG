import { Character } from './Character.ts';

export class Team {
    private members: Character[];
    private inventory: Object[] = [];

    constructor( members: Character[] ) {
        this.members = members;
        this.inventory = [];
    }
    
    public getMembers(): Character[] {
        return this.members;
    }

    public addMember( member: Character ): void {
        this.members.push( member );
    }

    public addToInventory( item: any ): void {
        this.inventory.push( item );
    }
    public removeFromInventory( item: any ): void {
        const index = this.inventory.indexOf( item );
        if ( index > -1 ) {
            this.inventory.splice( index, 1 );
        }
    }
    getInventory(): any[] {
        return this.inventory;
    }
    
}

//import { Object } from './objects.ts';
//import { HealingObjects } from './objects.ts'; 
//import { ManaObjects } from './objects.ts';
//import { Caster } from './classe/caster.ts';
//import { Clerk } from './classe/clerk.ts';
//import { Warrior } from './classe/warrior.ts';
//import { healPotion, ether } from './items.ts';

//export const adventurers = new Team([
//    new Caster(),
//    new Clerk(),
//    new Warrior(),
//]);

//adventurers.addToInventory(healPotion);
//adventurers.addToInventory(ether);

//console.log( 'Team members:', adventurers.getMembers() );
//console.log( 'Team inventory:', adventurers.getInventory() );