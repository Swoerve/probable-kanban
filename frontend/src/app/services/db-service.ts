import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private http = inject(HttpClient)
  private boardId = 1

  constructor(){}

  getBoard(){
    return this.http.get(`/api/boards/${this.boardId}`)
  }
  
  getColumns(boardId: number){
    return this.http.get(`/api/columns/${boardId}`)
  }

  getTasks(columnId: number){
    return this.http.get(`/api/tasks/${columnId}`)
  }

}
