import { Component, OnInit } from '@angular/core';

import { InitiativeLine } from '../model/initiativeLine';
import { makeDecorator } from '@angular/core/src/util/decorators';

@Component({
  selector: 'app-initiative-tracker',
  templateUrl: './initiative-tracker.component.html',
  styleUrls: ['./initiative-tracker.component.css']
})
export class InitiativeTrackerComponent implements OnInit {

  editInitiative = true;

  initiativeLines: InitiativeLine[] = [];

  activeLine = 0;

  round = 1;

  constructor() { }

  ngOnInit() {
    this.add(0);
  }

  add = (index: number) => {
    let newLine = <InitiativeLine>{ 
      name: "New", 
      health: 0, 
      isMonster: true, 
      initiative: 0,
      initiativeStr: "0"
    };

    if (!index)
      return this.initiativeLines.push(newLine)

    this.initiativeLines.splice(index+1, 0, newLine);
  }

  assignInitiative = (index: number, value: string) => {
    var numberValue = parseInt(value);
    
    // modifier -> roll a 20
    if (value.startsWith("+") || value.startsWith("-")) {
      numberValue = Math.floor(Math.random() * 20) + 1 + numberValue;
    }

    this.initiativeLines[index].initiative = numberValue;
    this.initiativeLines[index].initiativeStr = value;

    this.initiativeLines = this.initiativeLines.sort((a, b) => {
      return b.initiative - a.initiative;
    });
  }

  back = () => {
    this.activeLine -= 1;

    if (this.activeLine < 0) {
      this.activeLine = this.initiativeLines.length-1;
      this.round -= 1;
    }
  }

  delete = (index: number) => {
    this.initiativeLines.splice(index, 1);
  }

  duplicate = (index: number) => {
    let line = this.initiativeLines[index];
    
    let newLine = <InitiativeLine>{ 
      name: line.name, 
      health: line.health, 
      isMonster: line.isMonster, 
      initiative: line.initiative,
      initiativeStr: line.initiativeStr
    };

    // increment number
    var nameParts = line.name.split(' ');
    let nameNumber = parseInt(nameParts[nameParts.length-1])
    if (nameNumber) {
      nameParts[nameParts.length-1] = (nameNumber+1).toString();
      newLine.name = nameParts.join(' ');
    }

    this.initiativeLines.splice(index+1, 0, newLine);

    // calculate values
    this.assignInitiative(index+1, line.initiativeStr);
  }

  forward = () => {
    this.activeLine += 1;

    if (this.activeLine >= this.initiativeLines.length) {
      this.activeLine = 0;
      this.round += 1;
    }
  }

  initiativeLinesDisplay = () => {
    return JSON.stringify(this.initiativeLines);
  }

  toggleMonster = (index: number) => {
    this.initiativeLines[index].isMonster = !this.initiativeLines[index].isMonster;
  }
}
