import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-adress-lable',
  templateUrl: './adress-label.component.html',
  styleUrls: ['./adress-label.component.css']
})
export class AdressLableComponent implements OnInit {

  @Input() lable:number = null;
  constructor() { }

  ngOnInit() {
  }

}
