import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { first_fit, best_fit, worst_fit } from './memory-algorithm';

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  memory_size:number = 1024;
  onChangeMemorySize = new Subject<number>();

  sort_algorithm:string = 'first_fit';
  onChangeSortAlgorithm = new Subject<string>();

  sorted_process:Block[] = [];
  onChangeSortedProcess = new Subject<Array<{hole: Hole, processes: Process[]}>>();

  input_process:Process[] = [];
  onChangeInputProcess = new Subject<Process[]>();
  
  input_holes:Hole[] = [];
  onChangeHoles = new Subject<Hole[]>();

  constructor() {
    this.onChangeInputProcess.subscribe(_ => this.sort());
    this.onChangeHoles.subscribe(_ => this.sort());
    this.onChangeMemorySize.subscribe(_ => this.sort());
    this.onChangeSortAlgorithm.subscribe(_ => this.sort());
  }

  sort(){
    if(this.sort_algorithm == 'best_fit'){
      /** best fit code */
      this.sorted_process = best_fit(this.memory_size,this.input_holes,this.input_process);
    }else if(this.sort_algorithm == 'worst_fit'){
      this.sorted_process = worst_fit(this.memory_size,this.input_holes,this.input_process);
    }else{
      /** first fit code */
      this.sorted_process = first_fit(this.memory_size,this.input_holes,this.input_process);
    }
    this.onChangeSortedProcess.next(this.sorted_process);
  }

  /********************************* */
  set_mem_size(size:number){
    this.memory_size = size;
    this.onChangeMemorySize.next(this.memory_size);
  }
  
  get_memory_size(){
    return {
      value: this.memory_size,
      valueChange: this.onChangeMemorySize
    }
  }
  /********************************* */
  
  /********************************* */
  set_sort_algorithm(algorithm:string){
    this.sort_algorithm = algorithm;
    this.onChangeSortAlgorithm.next(this.sort_algorithm);
  }
  
  get_sort_algorithm(){
    return {
      value: this.sort_algorithm,
      valueChange: this.onChangeSortAlgorithm
    }
  }
  /********************************* */
  
  /********************************* */
  push_process(process:Process){
    /**
     * Add new process to input process
     */
    this.input_process.push(process);
    this.onChangeInputProcess.next(this.input_process);
  }
  
  get_input_process(){
    return {
      value: this.input_process.slice(),
      valueChange: this.onChangeInputProcess
    }
  }
  
  delete_process(id:number){
    /**
     * delete process from input process
     */
    this.input_process = (this.input_process.filter(el=> el.id != id));
    this.onChangeInputProcess.next(this.input_process);
  }
  /********************************* */
  
  /********************************* */
  push_hole(hole:Hole){
    /**
     * Add new hole to holes array
     */
    this.input_holes.push(hole);
    this.onChangeHoles.next(this.input_holes);
  }
  
  get_holes(){
    return {
      value: this.input_holes,
      valueChange: this.onChangeHoles
    }
  }
  /********************************* */
  
  get_sorted_process(){
    return {
      value: this.sorted_process.slice(),
      valueChange: this.onChangeSortedProcess
    }
  }
  
  /********************************* */

  reset(){
    this.memory_size = 0;
    this.onChangeMemorySize.next(this.memory_size);

    this.sort_algorithm = 'first_fit';
    this.onChangeSortAlgorithm.next(this.sort_algorithm);

    this.sorted_process = [];
    this.onChangeSortedProcess.next(this.sorted_process);

    this.input_process = [];
    this.onChangeInputProcess.next(this.input_process);
    
    this.input_holes = [];
    this.onChangeHoles.next(this.input_holes);
  }
}

export interface Process{
  id:number,
  name:string,
  size:number,
  starting_add:number
}

export interface Hole{
  size:number
  starting_address:number,
  extra?:any
}

export interface Block{
  hole: Hole, processes: Process[]
}
