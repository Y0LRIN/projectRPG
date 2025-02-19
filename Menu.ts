class menu {
    //Properties
    public menuID: number;
    public menuDisplay: string;
    public options: string[];

    //Constructor
    constructor(menuID: number, menuDisplay: string, options: string[]) {
        this.menuID = menuID;
        this.menuDisplay = menuDisplay;
        this.options = options;
    }

    public displayMenu() {
        console.log(this.menuDisplay);
    }

    public displayOptions() {
        for (let i = 0; i<this.options.length; i++) {
            if (this.options[i] !== "") {
                console.log(`${i+1}. ${this.options[i]}`);
            }
        }
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