class menu {
    //Properties
    private menuID: number;
    private menuDisplay: string;
    private options: string[];

    public getMenuID(): number {
        return this.menuID;
    }

    //Constructor
    constructor(menuID: number, menuDisplay: string, options: string[]) {
        this.menuID = menuID;
        this.menuDisplay = menuDisplay;
        this.options = options;
    }

    //Methods
    //Method that displays the menu
    public displayMenu() {
        console.log(this.menuDisplay);
    }

    //Method that displays the options
    public displayOptions() {
        for (let i = 0; i<this.options.length; i++) {
            if (this.options[i] !== "") {
                console.log(`${i+1}. ${this.options[i]}`);
            }
        }
    }

    //Method that selects an option
    public selectOption() {
        let option = prompt("Select an option: ");
        if (option === null || !option.match(/^[1-8]$/) || option === "") {
            console.log("Invalid option. Please select a valid option.");
            return this.selectOption();
        }
        return option;
    }
}
const Mainmenu = new menu(1, "Main Menu", ["Start Game","Exit Game"]);
console.log("#///////////////////////////////////////////////////////////////#");
console.log(" #                      Welcome to the                         #");
console.log(" #                           RPG                               #");
console.log(" #                       Tape Goblin                           #");
console.log("#///////////////////////////////////////////////////////////////#");
Mainmenu.displayMenu();
Mainmenu.displayOptions();
const selectedOption = Mainmenu.selectOption();
console.log("#///////////////////////////////////////////////////////////////#")
const Charatermenu = new menu(2, "#                          Heros                                #",
    ["Guerrier","Mage","Paladin","Barbare","Prêtre","Voleur"]);
    
    Charatermenu.displayMenu();
    Charatermenu.displayOptions();

