import { Hole, Process, Block } from './general.service';

export function first_fit(memory_size:number, holes:Hole[], processes:Process[]){
    processes = processes.slice();
    holes = holes.slice();

    holes.sort((a,b)=>{
        // sort on starting address
        if(a.starting_address < b.starting_address){
            return -1; // 1 before 2
        }else if (a.starting_address > b.starting_address){
            return 1; // 2 before 1
        }
        return 0; // no change
    });

    let allocated_memory:Block[] = [];

    holes.forEach((hole,i)=>{
        /** creating memory blocks with holes and with no process */
        allocated_memory.push({
            hole:{
                starting_address: hole.starting_address,
                size: hole.size,
                extra:{
                    remaining_size: hole.size
                }
            },
            processes:[]
        });
    });


    processes.forEach((process,i)=>{
        let process_pushed:Boolean = false;
        let process_id:number = process.id;

        for(let j=0; j<allocated_memory.length; j++){
            if(process.size <= allocated_memory[j].hole.extra.remaining_size){
                let pushed_process = process;
                pushed_process['starting_add'] = (allocated_memory[j].processes.length)
                                                    ? allocated_memory[j].processes[allocated_memory[j].processes.length-1].starting_add+allocated_memory[j].processes[allocated_memory[j].processes.length-1].size 
                                                    : allocated_memory[j].hole.starting_address;
                allocated_memory[j].processes.push(process)
                process_pushed = true;
                allocated_memory[j].hole.extra.remaining_size -= process.size;
                break;
            }
        }

        if(!process_pushed){
            // if process is not pushed to any block
            // rais error
        }
    });

    return allocated_memory;

}

export function best_fit(memory_size:number, holes:Hole[], processes:Process[]){
    processes = processes.slice();
    holes = holes.slice();

    holes.sort((a,b)=>{
        // sort on smallest size
        if(a.size < b.size){
            return -1; // 1 before 2
        }else if (a.size > b.size){
            return 1; // 2 before 1
        }
        return 0; // no change
    });

    let allocated_memory:Block[] = [];

    holes.forEach((hole,i)=>{
        /** creating memory blocks with holes and with no process */
        allocated_memory.push({
            hole:{
                starting_address: hole.starting_address,
                size: hole.size,
                extra:{
                    remaining_size: hole.size
                }
            },
            processes:[]
        });
    });

    processes.forEach((process,i)=>{
        let process_pushed:Boolean = false;
        let process_id:number = process.id;
        for(let j=0; j<allocated_memory.length; j++){
            if(process.size <= allocated_memory[j].hole.extra.remaining_size){
                let pushed_process = process;
                pushed_process['starting_add'] = (allocated_memory[j].processes.length)
                                                    ? allocated_memory[j].processes[allocated_memory[j].processes.length-1].starting_add+allocated_memory[j].processes[allocated_memory[j].processes.length-1].size 
                                                    : allocated_memory[j].hole.starting_address;
                allocated_memory[j].processes.push(process)
                process_pushed = true;
                allocated_memory[j].hole.extra.remaining_size -= process.size;
                break;
            }
        }

        if(!process_pushed){
            // if process is not pushed to any block
            // rais error
        }
    });

    allocated_memory.sort((a,b)=>{
        if(a.hole.starting_address < b.hole.starting_address){
            return -1; // 1 before 2
        }else if (a.hole.starting_address > b.hole.starting_address){
            return 1; // 2 before 1
        }
        return 0; // no change
    });

    return allocated_memory;

}

export function worst_fit(memory_size:number, holes:Hole[], processes:Process[]){
    processes = processes.slice();
    holes = holes.slice();

    holes.sort((a,b)=>{
        // sort on smallest size
        if(a.size > b.size){
            return -1; // 1 before 2
        }else if (a.size < b.size){
            return 1; // 2 before 1
        }
        return 0; // no change
    });

    let allocated_memory:Block[] = [];

    holes.forEach((hole,i)=>{
        /** creating memory blocks with holes and with no process */
        allocated_memory.push({
            hole:{
                starting_address: hole.starting_address,
                size: hole.size,
                extra:{
                    remaining_size: hole.size
                }
            },
            processes:[]
        });
    });

    processes.forEach((process,i)=>{
        let process_pushed:Boolean = false;
        let process_id:number = process.id;
        for(let j=0; j<allocated_memory.length; j++){
            if(process.size <= allocated_memory[j].hole.extra.remaining_size){
                let pushed_process = process;
                pushed_process['starting_add'] = (allocated_memory[j].processes.length)
                                                    ? allocated_memory[j].processes[allocated_memory[j].processes.length-1].starting_add+allocated_memory[j].processes[allocated_memory[j].processes.length-1].size 
                                                    : allocated_memory[j].hole.starting_address;
                allocated_memory[j].processes.push(process)
                process_pushed = true;
                allocated_memory[j].hole.extra.remaining_size -= process.size;
                break;
            }
        }

        if(!process_pushed){
            // if process is not pushed to any block
            // rais error
        }
    });

    allocated_memory.sort((a,b)=>{
        if(a.hole.starting_address < b.hole.starting_address){
            return -1; // 1 before 2
        }else if (a.hole.starting_address > b.hole.starting_address){
            return 1; // 2 before 1
        }
        return 0; // no change
    });

    return allocated_memory;

}

export function valid_hole(memory_size:number,holes:Hole[],hole:Hole):{status:boolean,msg:string}{
    if(memory_size == null){
        return {
            status: false,
            msg: "Invalid memory size"
        };
    }
    
    if(hole.starting_address == null || hole.size == null){
        return {
            status: false,
            msg: "Invalid Hole Data"
        };
    }

    if((hole.starting_address + hole.size) > memory_size){
        return {
            status: false,
            msg: "Hole should be bounded within memory size"
        };
    }
    
    let flag: boolean = false;
    holes.forEach(old_hole=>{
        if((hole.starting_address >= old_hole.starting_address)
        && (hole.starting_address) < (old_hole.starting_address+old_hole.size)){
            flag = true;
        }
    });

    if(flag){
        return {
            status: false,
            msg: 'Hole intersects with another'
        }
    }

    return {
        status:true,
        msg: 'Valid Hole'
    };
}

export function valid_segment(memory_size:number,allocated_memory:Block[],segment:Process){

    let valid:Boolean = false;

    for(let i=0; i<allocated_memory.length; i++){
        let block = allocated_memory[i];
        if((segment.size <= block.hole.extra.remaining_size)){
            valid = true;
        }
    }
    
    if(!valid){
        return {
            status: false,
            msg: 'No Free Space Hold this Process'
        }
    }

    return {
        status: true,
        msg: 'Valid Process'
    }

}