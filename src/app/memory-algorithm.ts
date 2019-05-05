import { Hole, Process } from './general.service';

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

    let allocated_memory:Array<{hole: Hole, processes: Process[]}> = [];

    holes.forEach((hole,i)=>{
        /** creating memory blocks with holes and with no process */
        allocated_memory.push({
            hole:{
                starting_address: hole.starting_address,
                size: hole.size,
                extra:{
                    remaining_address: hole.size
                }
            },
            processes:[]
        });
    });


    processes.forEach((process,i)=>{
        let process_pushed:Boolean = false;
        let process_id:number = process.id;

        for(let j=0; j<allocated_memory.length; j++){
            if(process.size <= allocated_memory[j].hole.extra.remaining_address){
                let pushed_process = process;
                pushed_process['starting_add'] = (allocated_memory[j].processes.length)
                                                    ? allocated_memory[j].processes[allocated_memory[j].processes.length-1].starting_add+allocated_memory[j].processes[allocated_memory[j].processes.length-1].size 
                                                    : allocated_memory[j].hole.starting_address;
                allocated_memory[j].processes.push(process)
                process_pushed = true;
                allocated_memory[j].hole.extra.remaining_address -= process.size;
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

    let allocated_memory:Array<{hole: Hole, processes: Process[]}> = [];

    holes.forEach((hole,i)=>{
        /** creating memory blocks with holes and with no process */
        allocated_memory.push({
            hole:{
                starting_address: hole.starting_address,
                size: hole.size,
                extra:{
                    remaining_address: hole.size
                }
            },
            processes:[]
        });
    });

    processes.forEach((process,i)=>{
        let process_pushed:Boolean = false;
        let process_id:number = process.id;
        for(let j=0; j<allocated_memory.length; j++){
            if(process.size <= allocated_memory[j].hole.extra.remaining_address){
                let pushed_process = process;
                pushed_process['starting_add'] = (allocated_memory[j].processes.length)
                                                    ? allocated_memory[j].processes[allocated_memory[j].processes.length-1].starting_add+allocated_memory[j].processes[allocated_memory[j].processes.length-1].size 
                                                    : allocated_memory[j].hole.starting_address;
                allocated_memory[j].processes.push(process)
                process_pushed = true;
                allocated_memory[j].hole.extra.remaining_address -= process.size;
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

    let allocated_memory:Array<{hole: Hole, processes: Process[]}> = [];

    holes.forEach((hole,i)=>{
        /** creating memory blocks with holes and with no process */
        allocated_memory.push({
            hole:{
                starting_address: hole.starting_address,
                size: hole.size,
                extra:{
                    remaining_address: hole.size
                }
            },
            processes:[]
        });
    });

    processes.forEach((process,i)=>{
        let process_pushed:Boolean = false;
        let process_id:number = process.id;
        for(let j=0; j<allocated_memory.length; j++){
            if(process.size <= allocated_memory[j].hole.extra.remaining_address){
                let pushed_process = process;
                pushed_process['starting_add'] = (allocated_memory[j].processes.length)
                                                    ? allocated_memory[j].processes[allocated_memory[j].processes.length-1].starting_add+allocated_memory[j].processes[allocated_memory[j].processes.length-1].size 
                                                    : allocated_memory[j].hole.starting_address;
                allocated_memory[j].processes.push(process)
                process_pushed = true;
                allocated_memory[j].hole.extra.remaining_address -= process.size;
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