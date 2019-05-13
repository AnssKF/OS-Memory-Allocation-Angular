import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { GeneralService, Process } from '../general.service';
import { valid_hole, valid_segment } from '../memory-algorithm';

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
  hole_form_error:string = null;

  process_form = this.formbuilder.group({
    name: [null,[Validators.required]],
    segments_number: [null,[Validators.required,Validators.min(1)]],
    segments: this.formbuilder.array([
      new FormControl(null,[Validators.required]),
    ]),
  });
  process_form_error:string = null;

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

  reset(){
    this.memory_size.reset();
    this.sort_algorithm.patchValue('first_fit');
    this.holes_form.reset();
    this.process_form.reset();
    this.generalService.reset();
  }

  onSubmitHolesForm(){

    let flag = valid_hole(this.memory_size.value,this.generalService.get_holes().value,{
      starting_address: this.holes_form.value.starting_address,
      size: this.holes_form.value.size
    });
    
    if(flag.status){
      this.hole_form_error = null;
      this.generalService.push_hole({
        starting_address: this.holes_form.value.starting_address,
        size: this.holes_form.value.size
      });
      this.holes_form.reset();
    }else{
      this.hole_form_error = flag.msg;
    }

  }
  
  onSubmitProcessForm(){
    
    // console.log(this.process_form.value)

    let process_segments:Process[] = [];

    this.get_process_seg.value.forEach((seg_size,index) => {
      process_segments.push({
        id:         this.current_process_id,
        name:       this.process_form.value.name + ' seg-' + index,
        starting_add: null,
        size:       seg_size,
      });
    });

    let valid:boolean = true;
    process_segments.forEach(seg=>{
      let flag = valid_segment(this.generalService.get_memory_size().value,
      this.generalService.get_sorted_process().value, seg);
      
      if(flag.status == false){
        valid = false;
        this.process_form_error = flag.msg;
      }else{
        valid = true;
      }  
    });
    
    if(valid){
      process_segments.forEach(seg=>{
        this.generalService.push_process(seg);
      });
      this.current_process_id++;
      this.process_form.reset();
      this.process_form_error = null;
    }

  }

}
