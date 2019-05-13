function add_old(memory_size, allocated_memory) {
  allocated_memory = allocated_memory.slice();
  // code here
  for (let i = 0; i < allocated_memory.length - 1; i++) {
    for (let j = i + 1; j < allocated_memory.length; j++) {
      if (
        allocated_memory[i]["hole"]["starting_address"] >
        allocated_memory[j]["hole"]["starting_address"]
      ) {
        let temp = allocated_memory[i];
        allocated_memory[i] = allocated_memory[j];
        allocated_memory[j] = temp;
      }
    }
  }
  if (allocated_memory[0]["hole"]["starting_address"] != 0) {
    new_hole = {
      size: allocated_memory[0]["hole"]["starting_address"],
      starting_address: 0
      //extra?:any
    };
    new_block = { hole: new_hole };
    allocated_memory.unshift(new_block);
  }
  for (let i = 0; i < allocated_memory.length - 1; i++) {
    if (
      allocated_memory[i]["hole"]["starting_address"] +
        allocated_memory[i]["hole"]["size"] !=
      allocated_memory[i + 1]["hole"]["starting_address"]
    ) {
      new_hole = {
        size:
          allocated_memory[i + 1]["hole"]["starting_address"] -
          allocated_memory[i]["hole"]["starting_address"] -
          allocated_memory[i]["hole"]["size"],
        starting_address:
          allocated_memory[i]["hole"]["starting_address"] +
          allocated_memory[i]["hole"]["size"]
        //extra?:any
      };
      new_block = { hole: new_hole };
      allocated_memory.splice(i + 1, 0, new_block);
    }
  }
  if (
    allocated_memory[allocated_memory.length - 1]["hole"]["starting_address"] +
      allocated_memory[allocated_memory.length - 1]["hole"]["size"] !=
    memory_size
  ) {
    new_hole = {
      size:
        memory_size -
        allocated_memory[allocated_memory.length - 1]["hole"][
          "starting_address"
        ] -
        allocated_memory[allocated_memory.length - 1]["hole"]["size"],
      starting_address:
        allocated_memory[allocated_memory.length - 1]["hole"][
          "starting_address"
        ] + allocated_memory[allocated_memory.length - 1]["hole"]["size"]
      //extra?:any
    };
    new_block = { hole: new_hole };
    allocated_memory.push(new_block);
  }
  console.log(allocated_memory.slice());
}

let Process = {
  id: 1,
  name: "string",
  size: 2,
  code: 3,
  data: 4,
  starting_add: 5
};

let Hole1 = {
  size: 10,
  starting_address: 100
};
let Hole2 = {
  size: 5,
  starting_address: 50
};
let Hole3 = {
  size: 20,
  starting_address: 75
};

let Block = [
  {
    hole: Hole1,
    processes: Process
  },
  {
    hole: Hole2,
    processes: Process
  },
  {
    hole: Hole3,
    processes: Process
  }
];
