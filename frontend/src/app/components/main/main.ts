import { Component } from '@angular/core';
import { Board } from '../board/board';

@Component({
  selector: 'app-main',
  imports: [ Board ],
  templateUrl: './main.html',
  styleUrl: './main.css',
})
export class Main {

}
