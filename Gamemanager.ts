import { menu } from "./Menu.ts";
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
    private Mainmenu = new menu(1, "Main Menu", ["Play","Exit"]);
    private characterMenu = new menu(2, "Heroes", ["Warrior", "Knight", "Paladin", "Caster", "Clerk", "Rogue"]);
    private battleMenu = new menu(3, "Battle", ["Attack","Special", "Item", "Run"]);
    private targetMenu = new menu(4, "Target", []);
    private itemMenu = new menu(5, "Item", []);

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
        console.log("#///////////////////////////////////////////////////////////////#");
        console.log("#                      Welcome to                               #");
        console.log("#                      Goblin Slayer                            #");
        console.log("#///////////////////////////////////////////////////////////////#");
        this.showMainMenu();
    }

    private showMainMenu(): void {
}