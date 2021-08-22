import React from 'react'

const AddTask = () => {
    return (
        <div className="add-task-dialog">
            <input />
            <div className="add-task-actions-container">
                <div className="btns-container">
                    <button className="add-btn">Add task</button>
                    <button className="cancel-btn">Cancel</button>
                </div>
                <div className="icon-container"></div>
            </div>
        </div>
    )
}

function Tasks() {
    return (
        <div className="tasks">
            <h1>Index</h1>
            <div className="add-task-btn">
                <span className="plus">+</span>
                <span className="add-task-text">Add Task</span>
            </div>
            <AddTask />
        </div>
    )
}

export default Tasks;
