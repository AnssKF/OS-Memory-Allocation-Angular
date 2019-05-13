import { Component, OnInit, Input } from '@angular/core';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-memory-card',
  templateUrl: './memory-card.component.html',
  styleUrls: ['./memory-card.component.css']
})
export class MemoryCardComponent implements OnInit {

  @Input() process = null;

  constructor(private generalService:GeneralService) { }

  ngOnInit() {
  }

  delete_process(process_id:number){
    if(confirm('This will delete app segment related! Are you sure?')){
      this.generalService.delete_process(process_id);
    }
  }

  delete_oldprocess(starting_address:number,size:number){
    this.generalService.push_hole({
      size:size,
      starting_address:starting_address,
    })
  }

}
