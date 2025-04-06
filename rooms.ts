import { Team } from "./team.ts";
import { Character } from "./Character.ts";
import { Goblin } from "./monster/goblin.ts";
import { GoblinArtcher } from "./monster/goblinArtcher.ts";
import { GoblinWolf } from "./monster/goblinWolf.ts";
import { GoblinMage } from "./monster/goblinMage.ts";
import { ogre } from "./monster/ogre.ts";
import { healPotion, ether, starShard, halfStar } from "./items.ts";

export enum RoomType {
    EASY_BATTLE = "easy_battle",
    HARD_BATTLE = "hard_battle",
    BOSS_BATTLE = "boss_battle",
    CHEST = "chest",
}

export class Rooms {
    private roomID: number;
    private roomType: RoomType;
    private completed: boolean = false;
    private enemyFactory: EnemyFactory;
    private treasureFactory: TreasureFactory;

    constructor(roomID: number, roomType: RoomType) {
        this.roomID = roomID;
        this.roomType = roomType;
        this.enemyFactory = new EnemyFactory();
        this.treasureFactory = new TreasureFactory();
    }

    public getRoomID(): number {
        return this.roomID;
    }
    public getRoomType(): string {
        return this.roomType;
    }
    public isCompleted(): boolean {
        return this.completed;
    }
    public setCompleted(completed: boolean): void {
        this.completed = completed;
    }

    // Returns an array of enemies based on the room type
    public getEnemies(): Character[] {
        switch (this.roomType) {
            case RoomType.EASY_BATTLE:
                return this.enemyFactory.createEasyEncounter();
            case RoomType.HARD_BATTLE:
                return this.enemyFactory.createHardEncounter();
            case RoomType.BOSS_BATTLE:
                return this.enemyFactory.createBossEncounter();
            default:
                return [];
        }
    }

    public handleChest(team: Team): void {
        console.log("You found a chest!");
        this.treasureFactory.openChest(team);
    }
}

// Factory classes for creating enemies and treasures
class EnemyFactory {
    public createEasyEncounter(): Character[] {
        const enemies: Character[] = [];
        for (let i = 0; i < 3; i++) {
            const roll = Math.random() * 100;
            if (roll < 50) {
                enemies.push(new Goblin());
            } else if (roll < 80) {
                enemies.push(new GoblinArtcher());
            } else {
                enemies.push(new GoblinWolf());
            }
        }
        return enemies;
    }

    public createHardEncounter(): Character[] {
        const enemies: Character[] = [];
        for (let i = 0; i < 3; i++) {
            const roll = Math.random() * 100;
            if (roll < 30) {
                enemies.push(new Goblin());
            } else if (roll < 60) {
                enemies.push(new GoblinArtcher());
            } else if (roll < 90) {
                enemies.push(new GoblinWolf());
            } else {
                enemies.push(new GoblinMage());
            }
        }
        return enemies;
    }

    public createBossEncounter(): Character[] {
        const enemies: Character[] = [];
        enemies.push(new ogre());
        return enemies;
    }
}

class TreasureFactory {
    public openChest(team: Team): void {
        const isTrap = Math.random() < 0.25;
        if (isTrap) {
            console.log("It's a trap!");
            this.triggerTrap(team);
        } else {
            this.giveRandomItem(team);
        }
    }

    private triggerTrap(team: Team): void {
        const isGroupDamage = Math.random() < 0.5;
        if (isGroupDamage) {
            console.log("Gas pours out of the chest, dealing 4 damage to everyone!");
            team.getMembers().forEach(member => {
                if (member.isAlive()) {
                    member.currenthealth -= 4;
                    if (member.currenthealth <0) member.currenthealth = 0;
                    console.log(`${member.name} takes 4 damage! (${member.currenthealth}/${member.maxHealth} HP)`);

                }
            });
        } else {
            const aliveMembers = team.getMembers().filter(member => member.isAlive());
            if (aliveMembers.length > 0) {
                const target = aliveMembers[Math.floor(Math.random() * aliveMembers.length)];
                console.log(`A dart shoots out from the chest, hitting ${target.name}!`);
                target.currenthealth -= 8;
                if (target.currenthealth < 0) target.currenthealth = 0;
                console.log(`${target.name} takes 8 damage! (${target.currenthealth}/${target.maxHealth} HP)`);
            }
        }
    }

    private giveRandomItem(team: Team): void {
        const roll = Math.random() * 100;
        if (roll < 60) {
            team.addToInventory(healPotion);
            console.log("You found a healing potion!");
        } else if (roll < 85) {
            team.addToInventory(ether);
            console.log("You found an ether!");
        } else if (roll < 95) {
            team.addToInventory(starShard);
            console.log("You found a star shard!");
        } else {
            team.addToInventory(halfStar);
            console.log("You found a half star! Lucky you!");
        }
    }
}