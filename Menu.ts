class menu {
    //Properties
    public menuID: number;
    public menuDisplay: string;
    public pos1: string;
    public pos2: string;
    public pos3: string;
    public pos4: string;
    public pos5: string;
    public pos6: string;
    public pos7: string;
    public pos8: string;

    //Constructor
    constructor(menuID: number, menuDisplay: string, pos1: string, pos2: string, pos3: string, pos4: string, pos5: string, pos6: string, pos7: string, pos8: string) {
        this.menuID = menuID;
        this.menuDisplay = menuDisplay;
        this.pos1 = pos1;
        this.pos2 = pos2;
        this.pos3 = pos3;
        this.pos4 = pos4;
        this.pos5 = pos5;
        this.pos6 = pos6;
        this.pos7 = pos7;
        this.pos8 = pos8;
    }

    public displayMenu() {
        console.log(this.menuDisplay);
    }

    public displayOptions() {
        console.log(`1. ${this.pos1}`);
        console.log(`2. ${this.pos2}`);
        console.log(`3. ${this.pos3}`);
        console.log(`4. ${this.pos4}`);
        console.log(`5. ${this.pos5}`);
        console.log(`6. ${this.pos6}`);
        console.log(`7. ${this.pos7}`);
        console.log(`8. ${this.pos8}`);
    }

    public selectOption() {
        let option = prompt("Select an option: ");
        if (option === null || !option.match(/^[1-8]$/) || option === "") {
            console.log("Invalid option. Please select a valid option.");
            return this.selectOption();
        }
        return option;
    }
}