import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-memory-card',
  templateUrl: './memory-card.component.html',
  styleUrls: ['./memory-card.component.css']
})
export class MemoryCardComponent implements OnInit {

  @Input() starting_add = null;
  @Input() name:string = null;
  @Input() size:Number = null;
  @Input() segments:Number = null;
  @Input() code:Number = null;
  @Input() data:String = null;

  @Input() last_one:boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
