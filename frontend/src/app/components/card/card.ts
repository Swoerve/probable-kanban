import { Component, input } from '@angular/core';
import { CdkDrag } from '@angular/cdk/drag-drop'

@Component({
  selector: 'app-card',
  imports: [CdkDrag],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  task = input<any>()

}
