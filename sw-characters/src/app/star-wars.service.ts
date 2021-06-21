import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { LogService } from "./log.service";
import { Character } from "./models/Character";

@Injectable({
    providedIn: 'root'
})
export class StarWarsService {
    private characters = [
        { name: 'Luke Skywalker', side: '' },
        { name: 'Darth Vader', side: '' }
    ];
    charactersChanged = new Subject<void>();

    constructor(private logger: LogService) { }

    getCharacters(chosenList: string) {
        if (chosenList === 'all') {
            return this.characters.slice();
        } else {
            return this.characters.filter((character: Character) => {
                return character.side === chosenList;
            });
        }
    }

    onSideAssigned(changedCharacter: Character) {
        const pos = this.characters.findIndex((character: Character) => {
            return character.name === changedCharacter.name;
        });
        this.characters[pos].side = changedCharacter.side;
        this.charactersChanged.next();
        this.logger.log(
            `Changed side of ${changedCharacter.name} to ${changedCharacter.side}`
        );
    }

    addCharacter(name: string, side: string) {
        const pos = this.characters.findIndex((character: Character) => {
            return character.name === name;
        });
        if (pos === -1) {
            this.characters.push({ name, side });
        }
    }
}