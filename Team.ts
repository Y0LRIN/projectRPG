import { Character } from './Character';

export class Team {
    private members: Character[];
    private inventory: any[] = [];

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
    
}