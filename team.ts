import { Character } from './Character';

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

import { Object } from './objects';
import { HealingObjects } from './objects'; 
import { ManaObjects } from './objects';
import { Caster } from './classe/caster';
import { Clerk } from './classe/clerk';
import { Warrior } from './classe/warrior';

new Team ( [
    new Caster(),
    new Clerk(),
    new Warrior(),
] );

console.log( 'Team members:', team.getMembers() );
