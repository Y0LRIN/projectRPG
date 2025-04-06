export class Character {
    //Properties
    public name: string;
    public ATK: number;
    public DEF: number;
    public SPD: number;
    public maxHealth: number;
    public currenthealth : number;
    public healCap: number;  //Is a percentage
    public resurrectHealth: number;  //Is a percentage

    //Constructor
    public constructor (
                name: string,
                ATK: number,
                DEF: number,
                SPD: number,
                maxHealth: number,
                healCap: number,
                resurrectHealth: number) {
        this.name = name;
        this.ATK = ATK;
        this.DEF = DEF;
        this.SPD = SPD;
        this.maxHealth = maxHealth;
        this.currenthealth = maxHealth;
        this.healCap = healCap;
        this.resurrectHealth = resurrectHealth;
    }
    
    //Methods
    //Method that checks if the character is alive
    public isAlive() {
        if (this.currenthealth > 0) {
            return true;
        }
        return false;
    }

    //Attack method that attacks the target character for the difference between the attacker's ATK and the target's DEF
    public attack(target: Character) {
        if (!this.isAlive()) {
            console.log(`${this.name} is dead and cannot attack!`);
            return;
        }
        if (!target.isAlive()) {
            console.log(`${target.name} is dead and cannot be attacked!`);
            return;
        }
        let damage = this.ATK - target.DEF;
        if (damage <= 0) {
            damage = 1;
        }
        target.currenthealth -= damage;
        if (target.currenthealth < 0) {
            target.currenthealth = 0;
        }
        console.log(`${this.name} attacks ${target.name} for ${damage} damage!`);
    }

    //Heal method that heals the target character for a percentage of their max health (healCap)
    public heal(target: Character) {
        if (!target.isAlive()) {
            console.log(`${target.name} is dead and cannot be healed!`);
            return;
        }
        let heal = target.maxHealth * (this.healCap / 100);
        target.currenthealth += heal;
        if (target.currenthealth > target.maxHealth) {
            target.currenthealth = target.maxHealth;
        }
        console.log(`${this.name} heals ${target.name} for ${heal} health!`);
    }

    //Method that resurrects a character if they're dead and heals them for a percentage of their max health (resurrectHealth)
    public resurrect() {
        if (!this.isAlive()) {
            let resurrect = this.maxHealth * (this.resurrectHealth / 100);
            this.currenthealth += resurrect;
            console.log(`${this.name} has been resurrected with ${resurrect} health!`);
        } else {
            console.log(`${this.name} is already alive!`);
            return;
        }
    }
}