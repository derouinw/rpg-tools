import { Component, OnInit } from '@angular/core';

import { InitiativeLine, Condition } from '../model/initiativeLine';
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
    let newLine = new InitiativeLine();

    if (!index)
      return this.initiativeLines.push(newLine)

    this.initiativeLines.splice(index+1, 0, newLine);
  }

  addCondition = (index: number) => {
    let newCondition = new Condition();

    this.initiativeLines[index].conditions.push(newCondition);
  }

  assignInitiative = (index: number, value: string) => {
    var numberValue = parseInt(value);
    var activeLine = this.initiativeLines[index];
    activeLine.initiativeStr = value;
    
    // modifier -> roll a 20
    var modIndex = value.indexOf("+");
    if (modIndex == -1) {
      modIndex = value.indexOf("-");
    }

    if (modIndex == 0) {
      // +mod only
      numberValue = Math.floor(Math.random() * 20) + 1 + numberValue;
    } else if (modIndex != -1) {
      // value+mod
      activeLine.initiativeStr = value.substr(modIndex);
    }

    activeLine.initiative = numberValue;

    this.initiativeLines = this.initiativeLines.sort((a, b) => {
      if (a.initiative == b.initiative) {
        return parseInt(b.initiativeStr) - parseInt(a.initiativeStr);
      }

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

  deleteCondition = (index: number, conditionIndex: number) => {
    this.initiativeLines[index].conditions.splice(conditionIndex, 1);
  }

  duplicate = (index: number) => {
    let line = this.initiativeLines[index];
    let newLine = new InitiativeLine(line);

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

    let activeLine = this.initiativeLines[this.activeLine];

    for (var index = 0; index < activeLine.conditions.length; index += 1) {
      let condition = activeLine.conditions[index];

      condition.rounds -= 1;
      if (condition.rounds <= 0) {
        activeLine.conditions.splice(index, 1);
        index -= 1;
      }
    }
  }

  initiativeLinesDisplay = () => {
    return JSON.stringify(this.initiativeLines);
  }

  toggleMonster = (index: number) => {
    this.initiativeLines[index].isMonster = !this.initiativeLines[index].isMonster;
  }
}
