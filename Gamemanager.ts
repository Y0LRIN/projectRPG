import { Menu } from "./Menu.ts";
import { displayHeader } from "./Menu.ts";
import { Team } from "./team.ts";
import { Character} from "./Character.ts";
import { Fight} from "./Fight.ts";
import { Warrior } from "./classe/warrior.ts";
import { Knight } from "./classe/knight.ts";
import { Paladin } from "./classe/paladin.ts";
import { Caster } from "./classe/caster.ts";
import { Clerk } from "./classe/clerk.ts";
import { Rogue } from "./classe/rogue.ts";
import { Goblin } from "./monster/goblin.ts";
import { GoblinWolf } from "./monster/goblinWolf.ts";
import { GoblinArtcher } from "./monster/goblinArtcher.ts";
import { GoblinMage } from "./monster/goblinMage.ts";
import { ogre } from "./monster/ogre.ts";
import { healPotion, ether, starShard, halfStar } from "./items.ts";

class GameManager {
    private Mainmenu = new Menu(1, "Main Menu", ["Play","Exit"]);
    private characterMenu = new Menu(2, "Heroes", ["Warrior", "Knight", "Paladin", "Caster", "Clerk", "Rogue"]);
    private battleMenu = new Menu(3, "Battle", ["Attack","Special", "Item", "Run"]);
    private targetMenu = new Menu(4, "Target", []);
    private itemMenu = new Menu(5, "Item", []);

    private playerTeam: Team | null = null;
    private currentFight: Fight | null = null;
    private gameRunning: boolean = true;

    private characterClasses: { [key: string]: new () => Character } = {
        "Warrior": Warrior,
        "Knight": Knight,
        "Paladin": Paladin,
        "Caster": Caster,
        "Clerk": Clerk,
        "Rogue": Rogue,
    };

    constructor() {

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
        this.startBattle("goblin");
    }

    private startBattle(encounterType: string): void {
        if (!this.playerTeam) {
            console.log("Error: No player team created.");
            return;
        }

        displayHeader("                Battle Begins!             ");

        const enemies: Character[] = [];
        if (encounterType === "goblin") {
            enemies.push(new Goblin());
            enemies.push(new GoblinWolf());
            enemies.push(new GoblinArtcher());
        } else if (encounterType === "boss") {
            enemies.push(new GoblinMage());
            enemies.push(new ogre());
        }

        console.log("You encounter:");
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
        if (this.playerteam && this.playerTeam.getMembers().some(char => char.isAlive())) {
            console.log("You have won the battle!");
            this.continueAdventure();
        } else {
            console.log("You have been defeated. Game Over.");
            this.gameOver();
        }
    }

    
}