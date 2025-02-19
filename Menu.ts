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