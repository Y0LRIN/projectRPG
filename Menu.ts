class menu {
    //Properties
    private menuID: number;
    private menuDisplay: string;
    protected options: string[];
    private selectedOption: string;
    private selectedOptionHeros: string[];

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
        let option = prompt("Selectionnez une option: ");
        if (option === null || !option.match(/^[1-8]$/) || option === "") {
            console.log("Option Invalide.Slectionnez une option valide.");
            return this.selectOption();
        }
        return option;
    }
    public selectOptionHeros() {
        let option = prompt("Select an option: ");
        if (option === null || !option.match(/^[1-6]$/) || option === "") {
            console.log("Option Invalide.Slectionnez une option valide.");
            return this.selectOption();
        }
        return option;
    }

}
const Mainmenu = new menu(1, "Main Menu", ["Jouer","Quitter"]);

console.log("#///////////////////////////////////////////////////////////////#");
console.log(" #                      Bienvenue dans                         #");
console.log(" #                           RPG                               #");
console.log(" #                       Tape Goblin                           #");
console.log("#///////////////////////////////////////////////////////////////#");
Mainmenu.displayMenu();
Mainmenu.displayOptions();
const selectedOption = Mainmenu.selectOption();
if (selectedOption === "1") {}
else if (selectedOption === "2") {console.log("Merci d'avoir joué à notre jeu !");
    Deno.exit(0);}

console.log("#///////////////////////////////////////////////////////////////#")
const Charatermenu = new menu(2, "#                            Heros                              #",
    ["Guerrier","Mage","Paladin","Barbare","Prêtre","Voleur"]);
    console.log("#                 choisie ton équipe de heros                   #")
    console.log("#                                                               #")
    console.log("#///////////////////////////////////////////////////////////////#")
    Charatermenu.displayMenu();
    Charatermenu.displayOptions();
    const selectedOptionHeros1 = Charatermenu.selectOptionHeros();
    const selectedOptionHeros2 = Charatermenu.selectOptionHeros();
    const selectedOptionHeros3 = Charatermenu.selectOptionHeros();
    console.log("#///////////////////////////////////////////////////////////////#")
    console.log("#                                                               #")
    console.log("#             vous avez choisi les heros suivants :             #")
    console.log("#                                                               #")
    console.log("#///////////////////////////////////////////////////////////////#")
    console.log(`Heros 1 : ${Charatermenu.options[parseInt(selectedOptionHeros1)-1]}`);
    console.log(`Heros 2 : ${Charatermenu.options[parseInt(selectedOptionHeros2)-1]}`);
    console.log(`Heros 3 : ${Charatermenu.options[parseInt(selectedOptionHeros3)-1]}`);
    console.log("#///////////////////////////////////////////////////////////////#")
    

