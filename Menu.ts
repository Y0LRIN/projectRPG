export class Menu {
    private menuID: number;
    private menuDisplay: string;
    public options: string[];
    private selectedOptionHeros: string[] = [];

    public getMenuID(): number {
        return this.menuID;
    }

    constructor(menuID: number, menuDisplay: string, options: string[]) {
        this.menuID = menuID;
        this.menuDisplay = menuDisplay;
        this.options = options;
    }

    public displayMenu() {
        console.log(this.menuDisplay);
    }

    public displayOptions() {
        for (let i = 0; i < this.options.length; i++) {
            if (this.options[i] !== "") {
                console.log(`${i + 1}. ${this.options[i]}`);
            }
        }
    }

    public selectOption(): string | null {
        let option = prompt("Selectionnez une option: ");
        if (option === null || !option.match(/^[1-8]$/) || option === "") {
            console.log("Option Invalide. Sélectionnez une option valide.");
            return this.selectOption();
        }
        return option;
    }

    public selectOptionHeros(): string | null {
        let option = prompt("Selection des héros: ");
        if (option === null || !option.match(/^[1-6]$/) || option === "") {
            console.log("Option Invalide. Sélectionnez une option valide.");
            return this.selectOptionHeros();
        }

        const selectedHero = this.options[parseInt(option) - 1];
        if (this.selectedOptionHeros.includes(selectedHero)) {
            console.log("Vous avez déjà choisi ce héros.");
            return this.selectOptionHeros();
        }

        this.selectedOptionHeros.push(selectedHero);
        return option;
    }

    public getSelectedHeros(): string[] {
        return this.selectedOptionHeros;
    }
}

export function displayHeader(header: string) {
    console.log("#///////////////////////////////////////////////////////////////#");
    console.log("#                                                               #");
    console.log(`# ${header} #`);
    console.log("#                                                               #");
    console.log("#///////////////////////////////////////////////////////////////#");
}

displayHeader("                Bienvenue dans RPG Tape Goblin               ");

const mainMenu = new Menu(1, "Main Menu", ["Jouer", "Quitter"]);
mainMenu.displayMenu();
mainMenu.displayOptions();
const selectedOption = mainMenu.selectOption();

if (selectedOption === "1") {
    displayHeader("                choisissez votre équipe de héros             ");
    const characterMenu = new Menu(2, "Heros", ["Guerrier", "Mage", "Paladin", "Barbare", "Prêtre", "Voleur"]);
    characterMenu.displayMenu();
    characterMenu.displayOptions();

    characterMenu.selectOptionHeros();
    characterMenu.selectOptionHeros();
    characterMenu.selectOptionHeros();

    displayHeader("              Vous avez choisi les héros suivants :          ");
    const selectedHeros = characterMenu.getSelectedHeros();
    selectedHeros.forEach((hero, index) => {
        console.log(`Héros ${index + 1} : ${hero}`);
    });
    console.log("#///////////////////////////////////////////////////////////////#");
} else if (selectedOption === "2") {
    console.log("Merci d'avoir joué à notre jeu !");
    Deno.exit(0);
}

