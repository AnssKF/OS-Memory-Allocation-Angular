import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { GeneralService } from '../general.service';

@Component({
  selector: 'app-memory-form',
  templateUrl: './memory-form.component.html',
  styleUrls: ['./memory-form.component.css']
})
export class MemoryFormComponent implements OnInit {

  current_process_id = 0;

  // Form Control Fields
  memory_size = this.formbuilder.control(null,[Validators.required,Validators.min(1)]);

  sort_algorithm = this.formbuilder.control('first_fit',[Validators.required]);

  holes_form = this.formbuilder.group({
    starting_address: [null,[Validators.required]],
    size: [null,[Validators.required,Validators.min(1)]]
  });

  process_form = this.formbuilder.group({
    name: [null,[Validators.required]],
    segments_number: [null,[Validators.required,Validators.min(1)]],
    segments: this.formbuilder.array([
      new FormControl(null,[Validators.required]),
    ]),
    code: [null,[Validators.required]],
    data: [null,[Validators.required]],
  });

  get get_process_seg(){
    return this.process_form.get('segments') as FormArray;
  }

  push_process_seg(){
    this.get_process_seg.push(
      new FormControl(null,[Validators.required])
    );
  }

  constructor(private formbuilder:FormBuilder,
              private generalService:GeneralService) { }

  ngOnInit() {
    this.memory_size.valueChanges.subscribe((val)=>{
      // console.log(val)
      this.generalService.set_mem_size(val);
    });

    this.sort_algorithm.valueChanges.subscribe((val) => {
      // console.log(val)
      this.generalService.set_sort_algorithm(val);
    });

    this.process_form.controls.segments_number.valueChanges.subscribe(val=>{
      let current = this.get_process_seg.length;
      if(val > current){
        let add = val-current;
        for(let i=0; i<add; i++){
          this.push_process_seg();
        }
      }else if(val < current){
        let sub = current - val;
        for(let i=0; i<sub; i++){
          this.get_process_seg.removeAt(this.get_process_seg.length -1);
        }
      }
    })
  }

  onSubmitHolesForm(){
    this.generalService.push_hole({
      starting_address: this.holes_form.value.starting_address,
      size: this.holes_form.value.size
    });

    this.holes_form.reset();
  }

  onSubmitProcessForm(){
    // console.log(this.process_form.value)

    this.get_process_seg.value.forEach((seg_size,index) => {
      this.generalService.push_process({
        id:         this.current_process_id,
        name:       this.process_form.value.name + 'seg-' + index,
        code:       this.process_form.value.code,
        data:       this.process_form.value.data,
        starting_add: null,
        size:       seg_size,
      });
    });
    this.current_process_id++;

    this.process_form.reset();
  }

}
