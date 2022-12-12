const {expect} = require("chai");
const {ethers} = require("hardhat");

describe("Task Contract", function(){
    let TaskContract;
    let taskContract;
    let owner;

    const NUM_TOTAL_TASKS = 5;

    let totalTasks;

    beforeEach(async function(){
        TaskContract = await ethers.getContractFactory("TaskContract");
        [owner] = await ethers.getSigners();
        taskContract = await TaskContract.deploy();

        totalTasks = [];

        for(let i=0; i<NUM_TOTAL_TASKS; i++){
            let task ={
                'content' : 'Task Number:-' + i,
                'isDeleted': false
            };
            await taskContract.addTask(task.content, task.isDeleted);
            totalTasks.push(task);
        }
    });

describe("Add Task", function(){
    it("should emit Addtask Event", async function(){
        let task = {
            'content': 'New task',
            'isDeleted': false,
        };
        await expect(await taskContract.addTask(task.content, task.isDeleted)
        ).to.emit(taskContract, 'AddTaskEvent').withArgs(owner.address, NUM_TOTAL_TASKS);
    });
    });

describe("Get All tasks", function(){
    it("should return the correct number of total tasks", async function(){
        const tasksFromChain = await taskContract.getMyTasks();
        expect(tasksFromChain.length).to.equal(NUM_TOTAL_TASKS);
    });
});

describe("Delete Task", function(){
   it("should emit dalete task event", async function(){
    const TASK_ID = 0;
    const TASK_DELETED = true;

    await expect(
        taskContract.deleteTask(TASK_ID, TASK_DELETED)
    ).to.emit(taskContract, 'DeleteTaskEvent'
    ).withArgs(
        TASK_ID, TASK_DELETED
    );
   }); 
});
})