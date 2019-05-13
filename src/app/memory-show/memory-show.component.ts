import { Component, OnInit } from '@angular/core';
import { GeneralService, Process, Hole } from '../general.service';
import { add_old } from '../memory-algorithm';

@Component({
  selector: 'app-memory-show',
  templateUrl: './memory-show.component.html',
  styleUrls: ['./memory-show.component.css']
})
export class MemoryShowComponent implements OnInit {

  hole_process_list:Array<{hole: Hole, processes: Process[]}>  = [];
  memory_size:number = 0;

  constructor(private generalService:GeneralService) { }

  ngOnInit() {
      this.generalService.get_sorted_process().valueChange.subscribe(
        sorted_process =>{
          // this.hole_process_list = sorted_process;
          this.hole_process_list = add_old(this.memory_size, sorted_process);
        }
      );

      this.generalService.get_memory_size().valueChange.subscribe(
        size => {
          this.memory_size = size;
        }
      );
  }

}
