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
const Mainmenu = new menu(1, "Main Menu", ["Start Game","Exit Game"])

console.log("#///////////////////////////////////////////////////////////////#");
console.log(" #                      Welcome to the                         #");
console.log(" #                           RPG                               #");
console.log(" #                       Tape Goblin                           #");
console.log("#///////////////////////////////////////////////////////////////#");
Mainmenu.displayMenu();
Mainmenu.displayOptions();
const selectedOption = Mainmenu.selectOption();
if (selectedOption === "1") {}
else if (selectedOption === "2") {console.log("Merci d'avoir joué à notre jeu !");
    process.exit(0);}

console.log("#///////////////////////////////////////////////////////////////#")
const Charatermenu = new menu(2, "#                            Heros                              #",
    ["Guerrier","Mage","Paladin","Barbare","Prêtre","Voleur"]);
    console.log("#                 choisie ton équipe de heros                   #")
    console.log("#                                                               #")
    console.log("#///////////////////////////////////////////////////////////////#")
    Charatermenu.displayMenu();
    Charatermenu.displayOptions();
    const selectedOptionHeros1 = Charatermenu.selectOption();
    const selectedOptionHeros2 = Charatermenu.selectOption();
    const selectedOptionHeros3 = Charatermenu.selectOption();
    console.log("#///////////////////////////////////////////////////////////////#")
    console.log("#                                                               #")
    console.log("#             vous avez choisi les heros suivants :             #")
    console.log("#                                                               #")
    console.log("#///////////////////////////////////////////////////////////////#")
    console.log(`Heros 1 : ${Charatermenu.options[selectedOptionHeros1-1]}`)
    console.log(`Heros 2 : ${Charatermenu.options[selectedOptionHeros2-1]}`)
    console.log(`Heros 3 : ${Charatermenu.options[selectedOptionHeros3-1]}`)

function seletHeros(Charatermenu:string) {
    
}

