import { Menu, displayHeader } from "./Menu.ts";
import { Team } from "./team.ts";
import { Character} from "./Character.ts";
import { Fight} from "./Fight.ts";
import { Warrior } from "./classe/warrior.ts";
import { Knight } from "./classe/knight.ts";
import { Paladin } from "./classe/paladin.ts";
import { Caster } from "./classe/caster.ts";
import { Clerk } from "./classe/clerk.ts";
import { Rogue } from "./classe/rogue.ts";
import { healPotion, ether, starShard, halfStar } from "./items.ts";
import { Rooms, RoomType } from "./rooms.ts";
import { ogre } from "./monster/ogre.ts";

class GameManager {
    private Mainmenu: Menu;
    private characterMenu: Menu;
    private battleMenu: Menu;
    private targetMenu: Menu;
    private itemMenu: Menu;
    private roomMenu: Menu;

    private playerTeam: Team | null = null;
    private currentFight: Fight | null = null;
    private gameRunning: boolean = true;
    private rooms: Rooms[] = [];
    private currentRoomIndex: number = 0;
    private roomNavigator: RoomNavigator;

    private characterClasses: { [key: string]: new () => Character } = {
        "Warrior": Warrior,
        "Knight": Knight,
        "Paladin": Paladin,
        "Caster": Caster,
        "Clerk": Clerk,
        "Rogue": Rogue,
    };

    constructor() {
        this.Mainmenu = new Menu(1, "Main Menu", ["Play", "Exit"]);
        this.characterMenu = new Menu(2, "Heroes", ["Warrior", "Knight", "Paladin", "Caster", "Clerk", "Rogue"]);
        this.battleMenu = new Menu(3, "Battle", ["Attack", "Special Ability", "Item"]);
        this.targetMenu = new Menu(4, "Target", []);
        this.itemMenu = new Menu(5, "Items", []);
        this.roomMenu = new Menu(6, "Room Navigation", ["Continue to next room", "Check inventory", "View team status"]);
        this.roomNavigator = new RoomNavigator();
        this.initRooms();
    }

    public initRooms(): void {
        this.rooms = this.roomNavigator.createDungeon();
    }

    public start(): void {
        displayHeader("                Welcome to RPG Tape Goblin               ");
        this.showMainMenu();
    }

    private showMainMenu(): void {
        this.Mainmenu.displayMenu();
        this.Mainmenu.displayOptions();
        const choice = this.Mainmenu.selectOption();

        if (choice === "1") {
            this.createTeam();
        } else if (choice === "2") {
            console.log("Exiting the game. Goodbye!");
            this.gameRunning = false;
            Deno.exit(0);
        }
    }

    private createTeam(): void {
        displayHeader("                Choose your team of heroes             ");

        this.characterMenu = new Menu(2, "Heroes", ["Warrior", "Knight", "Paladin", "Caster", "Clerk", "Rogue"]);
        this.characterMenu.displayMenu();
        this.characterMenu.displayOptions();

        this.characterMenu.selectOptionHeros();
        this.characterMenu.selectOptionHeros();
        this.characterMenu.selectOptionHeros();

        const selectedHeroNames = this.characterMenu.getSelectedHeros();
        const selectedHeroes: Character[] = [];

        displayHeader("              You have chosen the following heroes:          ");

        selectedHeroNames.forEach((heroName, index) => {
            console.log(`Hero ${index + 1} : ${heroName}`);
            if (heroName in this.characterClasses) {
                const heroInstance = new this.characterClasses[heroName]();
                selectedHeroes.push(heroInstance);
            }
        });

        this.playerTeam = new Team(selectedHeroes);
        this.playerTeam.addToInventory(healPotion);
        this.playerTeam.addToInventory(healPotion);
        this.playerTeam.addToInventory(ether);
        this.playerTeam.addToInventory(starShard);

        console.log("#///////////////////////////////////////////////////////////////#");
        console.log("Team members:");
        selectedHeroes.forEach(hero => {
            console.log(`- ${hero.name} (HP: ${hero.currenthealth}/${hero.maxHealth})`)
        });

        this.startAdventure();
    }

    private startAdventure(): void {
        displayHeader("                Adventure Begins!             ");
        this.currentRoomIndex = 0;
        this.enterCurrentRoom();
    }

    private enterCurrentRoom(): void {
        if (!this.playerTeam || this.currentRoomIndex >= this.rooms.length) {
            return;
        }

        const currentRoom = this.rooms[this.currentRoomIndex];
        displayHeader(`                You enter a ${currentRoom.getRoomID} room!             `);

        switch (currentRoom.getRoomType()) {
            case RoomType.EASY_BATTLE:
                console.log("You encounter a group of goblins!");
                this.startBattleWithEnemies(currentRoom.getEnemies());
                break;
            case RoomType.HARD_BATTLE:
                console.log("You encounter a strong group of goblins!");
                this.startBattleWithEnemies(currentRoom.getEnemies());
                break;
            case RoomType.CHEST:
                console.log("You find a chest in the center of the room!");
                currentRoom.handleChest(this.playerTeam);
                currentRoom.setCompleted(true);
                this.showRoomOptions();
                break;
            case RoomType.BOSS_BATTLE:
                console.log("You've reached the boss room! Prepare for a tough battle!");
                this.startBattleWithEnemies(currentRoom.getEnemies());
                break;
        }
    }

    private showRoomOptions(): void {
        this.roomMenu.displayMenu();
        this.roomMenu.displayOptions();
        const choice = this.roomMenu.selectOption();

        switch (choice) {
            case "1":
                this.moveToNextRoom();
                break;
            case "2":
                this.showInventory();
                this.showRoomOptions();
                break;
            case "3":
                this.showTeamStatus();
                this.showRoomOptions();
                break;
        }
    }

    private showInventory(): void {
        if (!this.playerTeam) return;

        const inventory = this.playerTeam.getInventory();

        console.log("\n=== INVENTORY ===");
        if (inventory.length === 0) {
            console.log("Your inventory is empty.");
        } else {
            inventory.forEach((item, index) => {
                console.log(`${index + 1}, ${item.getName()} - ${item.getDescription()}`);
            });
        }
        console.log("=================\n");
    }

    private showTeamStatus(): void {
        if (!this.playerTeam) return;

        const members = this.playerTeam.getMembers();
        console.log("\n=== TEAM STATUS ===");
        members.forEach(member => {
            console.log(`${member.name}: ${member.currenthealth}/${member.maxHealth} HP ${member.isAlive() ? "" : "(DEAD)"}`);
            if (member instanceof Caster || member instanceof Clerk) {
                console.log(`Mana: ${member.currentMana}/${member.maxMana}`);
            }
        });
        console.log("=================\n");
    }

    private moveToNextRoom(): void {
        if (this.currentRoomIndex < this.rooms.length - 1) {
            this.currentRoomIndex++;
            this.enterCurrentRoom();
        } else {
            console.log("You've reached the end of the dungeon!");
        }
    }

    private startBattleWithEnemies(enemies: Character[]): void {
        if (!this.playerTeam) {
            console.log("Error: Player team is not initialized.");
            return;
        }

        displayHeader("                Battle Begins!             ");
        console.log("Enemies: ");
        enemies.forEach(enemy => {
            console.log(`- ${enemy.name} (HP: ${enemy.currenthealth}/${enemy.maxHealth})`);
        });

        this.currentFight = new Fight(this.playerTeam.getMembers(), enemies);
        this.manageBattle();
    }

    private manageBattle(): void {
        if (!this.currentFight || !this.playerTeam) return;

        const fight = this.currentFight;
        fight.start();
        this.handleCombatTurns();
    }

    private handleCombatTurns(): void {
        if (!this.currentFight) return;

        let currentCharacter = this.currentFight.getCurrentTurn();

        while (currentCharacter && !this.currentFight.checkEnd()) {
            console.log(`\nIt's ${currentCharacter.name}'s turn!`);

            if (this.currentFight.isPlayerCharacter(currentCharacter)) {
                this.handlePlayerTurn(currentCharacter);
            } else {
                this.handleEnemyTurn(currentCharacter);
            }
            currentCharacter = this.currentFight.nextTurn();
        }
        const currentRoom = this.rooms[this.currentRoomIndex];
        if (this.playerTeam && this.playerTeam.getMembers().some(char => char.isAlive())) {
            console.log("You have won the battle!");
            currentRoom.setCompleted(true);

            if (currentRoom.getRoomType() === RoomType.BOSS_BATTLE) {
                this.victoryEnding();
            } else {
                this.showRoomOptions();
            }
        } else {
            console.log("You have been defeated...");
            this.gameOver();
        }
    }

    private handlePlayerTurn(character: Character): void {
        if (!this.currentFight) return;

        this.battleMenu.displayMenu();
        this.battleMenu.displayMenu();
        const choice = this.battleMenu.selectOption();

        switch(choice) {
            case "1": //Attack
                const enemies = this.currentFight.getAliveEnemies();
                this.targetMenu.options = enemies.map(enemy => `${enemy.name} (HP: ${enemy.currenthealth}/${enemy.maxHealth})`);
                this.targetMenu.displayMenu();
                this.targetMenu.displayOptions();
                const targetChoice = this.targetMenu.selectOption();
                const targetIndex = parseInt(targetChoice!)-1;
                if (targetIndex >= 0 && targetIndex < enemies.length) {
                    character.attack(enemies[targetIndex]);
                }
                break;
                
            case "2": //Special ability
                this.handleSpecialAbility(character);
                break;

            case "3": //Item
                if (this.playerTeam) {
                    this.handleItemUse(character);
                }
                break;
        }
    }

    private handleSpecialAbility(character: Character): void {
        if (!this.currentFight) return;
        
        if (character instanceof Warrior) {
            character.berserk(this.currentFight.getAliveEnemies());
        } else if (character instanceof Paladin) {
            character.smite(this.currentFight.getAliveEnemies());
        } else if (character instanceof Rogue) {
            if (this.playerTeam) {
                character.steal(this.playerTeam);
            }
        } else if (character instanceof Clerk) {
            const allies = this.currentFight.getAliveTeamMembers();
            this.targetMenu.options = allies.map(ally => `${ally.name} (HP: ${ally.currenthealth}/${ally.maxHealth})`);
            this.targetMenu.displayMenu();
            this.targetMenu.displayOptions();
            const targetChoice = this.targetMenu.selectOption();
            const targetIndex = parseInt(targetChoice!) - 1;
            if (targetIndex >= 0 && targetIndex < allies.length) {
                (character as any).magicHeal(allies[targetIndex]); 
            }
        } else if (character instanceof Caster) {
            const enemies = this.currentFight.getAliveEnemies();
            this.targetMenu.options = enemies.map(enemy => `${enemy.name} (HP: ${enemy.currenthealth}/${enemy.maxHealth})`);
            this.targetMenu.displayMenu();
            this.targetMenu.displayOptions();
            const targetChoice = this.targetMenu.selectOption();
            const targetIndex = parseInt(targetChoice!) - 1;
            if (targetIndex >= 0 && targetIndex < enemies.length) {
                (character as any).fireball(enemies[targetIndex]); 
            }
        } else {
            console.log(`${character.name} has no special ability.`);
        }
    }

    private handleItemUse(character: Character): void {
        if (!this.playerTeam) return;

        const inventory = this.playerTeam.getInventory();
        if (inventory.length === 0) {
            console.log("No items in inventory.");
            return;
        }

        this.itemMenu.options = inventory.map(item => item.getName());
        this.itemMenu.displayMenu();
        this.itemMenu.displayOptions();
        const itemChoice = this.itemMenu.selectOption();
        const itemIndex = parseInt(itemChoice!) - 1;

        if (itemIndex >= 0 && itemIndex < inventory.length) {
            const selectedItem = inventory[itemIndex];
            if (selectedItem.constructor.name === "HealingObjects") {
                const allies = this.currentFight!.getAliveTeamMembers();
                this.targetMenu.options = allies.map(ally => `${ally.name} (HP: ${ally.currenthealth}/${ally.maxHealth})`);
                this.targetMenu.displayMenu();
                this.targetMenu.displayOptions();
                const targetChoice = this.targetMenu.selectOption();
                const targetIndex = parseInt(targetChoice!) - 1;
                if (targetIndex >= 0 && targetIndex < allies.length) {
                    selectedItem.use(allies[targetIndex], this.playerTeam);
                }
            } else if (selectedItem.constructor.name === "ManaObjects") {
                const manaUsers = this.currentFight!.getAliveTeamMembers().filter(
                    member => member instanceof Caster || member instanceof Clerk
                );
                if (manaUsers.length === 0) {
                    console.log("No mana users in the team.");
                    return;
                }

                this.targetMenu.options = manaUsers.map(manaUser => `${manaUser.name} (MP: ${manaUser.currentMana}/${manaUser.maxMana})`);
                this.targetMenu.displayMenu();
                this.targetMenu.displayOptions();
                const targetChoice = this.targetMenu.selectOption();
                const targetIndex = parseInt(targetChoice!) - 1;
                if (targetIndex >= 0 && targetIndex < manaUsers.length) {
                    selectedItem.use(manaUsers[targetIndex], this.playerTeam);
                }
            }
        }
    }

    private handleEnemyTurn(enemy: Character): void {
        if (!this.currentFight) return;

        const aliveTeamMembers = this.currentFight.getAliveTeamMembers();
        if (aliveTeamMembers.length === 0) return;

        if (enemy instanceof ogre) {
            // Ogre has a 30% chance to use its special ability
            if (Math.random() < 0.3) {
                console.log(`${enemy.name} uses its special ability!`);
                enemy.specialAttack(aliveTeamMembers); // Assuming `specialAttack` is defined for Ogre
                return;
            }
        }

        // 20% chance to attack the team member with the lowest health
        if (Math.random() < 0.2) {
            const target = aliveTeamMembers.reduce((lowest, member) => 
                member.currenthealth < lowest.currenthealth ? member : lowest
            );
            console.log(`${enemy.name} targets the weakest member: ${target.name}`);
            enemy.attack(target);
        } else {
            // 80% chance to attack a random team member
            const randomTarget = aliveTeamMembers[Math.floor(Math.random() * aliveTeamMembers.length)];
            console.log(`${enemy.name} attacks a random member: ${randomTarget.name}`);
            enemy.attack(randomTarget);
        }
    }

    private victoryEnding(): void {
        displayHeader("                Victory!             ");
        console.log("Congratulations! You have defeated the boss and completed the dungeon!");
        console.log("The goblins have been vanquished, and peace has returned to the land.");
        console.log("You and your team are hailed as heroes!");
        console.log("\nWould you like to play again?");
        this.Mainmenu.options = ["Play Again", "Exit"];
        this.Mainmenu.displayMenu();
        this.Mainmenu.displayOptions();
        const choice = this.Mainmenu.selectOption();
        if (choice === "1") {
            this.playerTeam = null;
            this.currentFight = null;
            this.initRooms();
            this.Mainmenu.options = ["Play", "Exit"];
            this.createTeam();
        } else {
            console.log("Thank you for playing!");
            Deno.exit(0);
        }
    }

    private gameOver(): void {
        displayHeader("                Game Over!             ");
        console.log("Your party has been defeated...");
        console.log("Would you like to play again?");
        this.Mainmenu.options = ["Continue", "Exit"];
        this.Mainmenu.displayMenu();
        this.Mainmenu.displayOptions();
        const choice = this.Mainmenu.selectOption();
        if (choice === "1") {
            this.playerTeam = null;
            this.currentFight = null;
            this.initRooms();
            this.Mainmenu.options = ["Play", "Exit"];
            this.createTeam();
        } else {
            console.log("Thank you for playing!");
            Deno.exit(0);
        }
    }
}

class RoomNavigator {
    public createDungeon(): Rooms[] {
        return [
            new Rooms(1, RoomType.EASY_BATTLE),
            new Rooms(2, RoomType.CHEST),
            new Rooms(3, RoomType.HARD_BATTLE),
            new Rooms(4, RoomType.CHEST),
            new Rooms(5, RoomType.BOSS_BATTLE),
        ];
    }
}