import { Character } from './Character.ts';

export class Fight {
    private team: Character[];
    private enemies: Character[];
    private turnOrder: Character[];
    private currentTurnIndex: number = 0;
    
    public constructor(team: Character[], enemies: Character[]) {
        this.team = team;
        this.enemies = enemies;
        this.turnOrder = [...team, ...enemies].sort((a, b) => b.SPD - a.SPD);
    }

    public start() {
        console.log('The fight begins!');
        this.displayBattlefield();
        return this.getCurrentTurn();
    }

    public getCurrentTurn(): Character | null {
        if (this.checkEnd()) {
            return null;
        }
        while (this.currentTurnIndex < this.turnOrder.length) {
            const character = this.turnOrder[this.currentTurnIndex];
            if (character.isAlive()) {
                return character;
            }
            this.currentTurnIndex = (this.currentTurnIndex + 1) % this.turnOrder.length;
        }
        return null;
    }

    public nextTurn(): Character | null {
        this.currentTurnIndex = (this.currentTurnIndex + 1) % this.turnOrder.length;
        this.displayBattlefield();
        return this.getCurrentTurn();
    }

    public isPlayerCharacter(character: Character): boolean {
        return this.team.includes(character);
    }

    public getAliveEnemies(): Character[] {
        return this.enemies.filter(enemy => enemy.isAlive());
    }

    public getAliveTeamMembers(): Character[] {
        return this.team.filter(member => member.isAlive());
    }

    public displayBattlefield() {
        console.log("\n=== BATTLEFIELD ===");
        console.log("Your team:");
        this.team.forEach(character => {
            console.log(`${character.name}: ${character.currenthealth}/${character.maxHealth} HP ${character.isAlive() ? "" : "(DEAD)"}`);
        });

        console.log("\nEnemies:");
        this.enemies.forEach(character => {
            console.log(`${character.name}: ${character.currenthealth}/${character.maxHealth} HP ${character.isAlive() ? "" : "(DEAD)"}`);
        });
        console.log("====================\n");
    }

    public checkEnd(): boolean {
        if (this.team.every(character => !character.isAlive())) {
            console.log('The fight is over! The enemies win!');
            return true;
        }
        if (this.enemies.every(character => !character.isAlive())) {
            console.log('The fight is over! The team wins!');
            return true;
        }
        return false;
    }
}