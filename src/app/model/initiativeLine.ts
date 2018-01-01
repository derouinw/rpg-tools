export class InitiativeLine {
    name: string;
    health: number;
    conditions: Condition[];
    isMonster: boolean;
    
    initiative: number;
    initiativeStr: string;

    constructor(line?: InitiativeLine) {
        this.name = line && line.name || "New";
        this.health = line && line.health || 0;
        this.conditions = line && line.conditions.slice(0) || [];
        this.isMonster = line && line.isMonster || true;
        this.initiative = line && line.initiative || 0;
        this.initiativeStr = line && line.initiativeStr || "0";

        // increment number
        if (line) {
            var nameParts = line.name.split(' ');
            let nameNumber = parseInt(nameParts[nameParts.length-1]);

            if (nameNumber) {
                nameParts[nameParts.length-1] = (nameNumber+1).toString();
                this.name = nameParts.join(' ');
            }
        }
    }
}

export class Condition {
    name: string;
    rounds: number;

    constructor() {
        this.name = "New";
        this.rounds = 1;
    }
}