// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity 0.8.17;

contract TaskContract {

    event AddTaskEvent(address recipient, uint taskId);
    event DeleteTaskEvent(uint taskId, bool isDeleted);

    struct Task {
        uint id;
        string content;
        bool isDeleted;
    }

    Task[] private tasks;
    mapping (uint => address ) taskToOwner;

    function addTask(string memory content, bool isDeleted) external {
        uint taskId = tasks.length;
        tasks.push(Task(taskId, content, isDeleted));
        taskToOwner[taskId] = msg.sender;
        emit AddTaskEvent(msg.sender, taskId);
    }
    
    function getMyTasks() external view returns(Task[] memory) {
        Task[] memory temporary = new Task[](tasks.length);
        uint counter = 0;
        for(uint i=0; i<tasks.length; i++) {
            if(taskToOwner[i] == msg.sender && tasks[i].isDeleted == false) {
                temporary[counter] = tasks[i];
                counter++;
            }
        }
        Task[] memory result = new Task[](counter);
        for(uint i=0; i<counter; i++) {
            result[i] = temporary[i];
        }
        return result;
    }
    function deleteTask(uint taskId, bool isDeleted) external {
        if(taskToOwner[taskId] == msg.sender) {
            tasks[taskId].isDeleted = isDeleted;
            emit DeleteTaskEvent(taskId, isDeleted);
        }
    }
}