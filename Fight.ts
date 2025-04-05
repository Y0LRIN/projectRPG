import { Character } from './Character.ts';

export class Fight {
    private team: Character[];
    private enemies: Character[];
    private turnOrder: Character[];
    
    public constructor(team: Character[], enemies: Character[]) {
        this.team = team;
        this.enemies = enemies;
        this.turnOrder = [...team, ...enemies].sort((a, b) => b.SPD - a.SPD);
    }

    public start() {
        console.log('The fight begins!');
        this.fightTurn(0);
    }

    private fightTurn(index: number) {
        if (this.checkEnd()) {
            return;
        }
        if (index >= this.turnOrder.length) {
            this.fightTurn(0);
            return;
        }
        const character = this.turnOrder[index];
        if (character.isAlive()) {
            if (this.team.includes(character)) {
                this.teamTurn(character);
            } else {
                this.enemyTurn(character);
            }
        }
        this.fightTurn(index + 1);
    }

    private teamTurn(character: Character) {}

    private enemyTurn(character: Character) {}

    private checkEnd() {
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