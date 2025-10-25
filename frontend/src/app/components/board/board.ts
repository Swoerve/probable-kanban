import { Component, signal } from '@angular/core';
import { CdkDragDrop, CdkDropList, moveItemInArray, CdkDropListGroup, transferArrayItem } from "@angular/cdk/drag-drop";
import { Card } from '../card/card';

@Component({
  selector: 'app-board',
  imports: [CdkDropList, Card, CdkDropListGroup],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class Board {
  columns: any[] = []
  createdNumber = 0

  addColumn() {
    console.log('adding column')
    let newColumn = {
      title: 'test',
      tasks: [],
      color: '#ffffff'
    }
    this.columns = [...this.columns, newColumn]
  }

  addTask(columnIndex: number){
    console.log('adding task')
    this.createdNumber++
    let newCard = {
      name: 'testName' + this.createdNumber
    }
    this.columns[columnIndex].tasks.push(newCard)
  }

  drop(event: CdkDragDrop<any[]>){
    
    console.log('dropping DnD task');
    console.log(event);
    
    console.log(event.previousContainer);
    console.log(event.previousContainer === event.container);
    
    if(event.previousContainer === event.container){
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex)
    }
    
  }
}
