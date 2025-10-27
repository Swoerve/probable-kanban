import { Component, effect, inject, signal } from '@angular/core';
import { CdkDragDrop, CdkDropList, moveItemInArray, CdkDropListGroup, transferArrayItem } from "@angular/cdk/drag-drop";
import { Card } from '../card/card';
import { DbService } from '../../services/db-service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-board',
  imports: [CdkDropList, Card, CdkDropListGroup],
  templateUrl: './board.html',
  styleUrl: './board.css',
})
export class Board {
  columns: any[] = []
  createdNumber = 0

  board = signal<any>(null)
  columns$!: Observable<any>
  columnTasks$!: any[]

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

  private dbService = inject(DbService)

  constructor(){
    effect(() => {
      console.log('starting effect, loading board');
      
      this.dbService.getBoard().subscribe(board => {
        console.log('board loaded, setting it');
        
        this.board.set(board)
        this.loadColumnsAndTasks()
      })
    })
  }

  loadColumnsAndTasks(){
    console.log('loading columns and tasks')
    this.dbService.getColumns(this.board().id).subscribe((columns: any) => {
      
      
      this.columns = columns.data
      console.log('columns loaded, loading tasks per each column');

      this.columns.forEach((column: any)=>{
        console.log(`loading tasks for column ${column.id}`);
        
        this.dbService.getTasks(column.id).subscribe((columnTasks: any) => {
          column.tasks = columnTasks.data
          console.log(`loaded tasks`);
          
        })
      })
    })

  }
}
