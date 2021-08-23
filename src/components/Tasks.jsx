
import React, { useState } from 'react'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css'
import dateFnsFormat from "date-fns/format"
import { format } from 'jest-validate';
import { formatDate } from 'tough-cookie';
import isAfter from 'date-fns/isAfter';
import isBefore from 'date-fns/isBefore';
import addDays from 'date-fns/addDays';
import isToday from 'date-fns/isToday';
import { date } from 'check-types';

const FORMAT = "dd/MM/yyyy";
function formatdate(date, format, locale) {
    return dateFnsFormat(date, format, { locale });
}
const AddTask = ({ onCancel, onAddTask }) => {
    const [task, settask] = useState("")
    const [date, setdate] = useState(null)
    return (
        <div className="add-task-dialog">
            <input value={task} onChange={(event) => settask(event.target.value)} />
            <div className="add-task-actions-container">
                <div className="btns-container">
                    <button
                        disabled={!task}
                        className="add-btn"
                        onClick={() => {
                            onAddTask(task, date);
                            // oncancel();
                            settask("")
                        }}
                    >
                        Add task
                    </button>
                    <button
                        className="cancel-btn"
                        onClick={() => {
                            onCancel();
                            settask("");
                        }}
                    >
                        Cancel
                    </button>
                </div>
                <div className="icon-container">
                    <DayPickerInput
                        onDayChange={(day) => setdate(day)}
                        placeholder={`${dateFnsFormat(new Date(), FORMAT)}`}
                        formatDate={formatDate}
                        format={FORMAT}
                        dayPickerProps={{
                            modifiers: {
                                disabled: [{ before: new Date() }],
                            },
                        }}
                    />
                </div>
            </div>
        </div >
    )
}

const TASK_HEADER_MAPPING = {
    INBOX: "Inbox",
    TODAY: "Today",
    NEXT_7: "Next 7 days",
};

const TaskItems = ({ selectedTab, tasks }) => {
    if (selectedTab === 'NEXT_7') {
        return tasks
            .filter(task => isAfter(task.date, new Date()) &&
                isBefore(task.date, addDays(new Date(), 7))
            )
            .map(task => (
                <div>
                    <span>
                        {task.text}{"   --->   "}
                    </span>
                    <span>{dateFnsFormat(new Date(task.date), FORMAT)} {" "}</span>
                    <hr />
                </div>
            ));
    }

    if (selectedTab === 'TODAY') {
        return tasks
            .filter(task => isToday(task.date))
            .map(task => (
                <div>
                    <span>
                        {task.text}{"   --->   "}
                    </span>
                    <span>
                        {dateFnsFormat(new Date(task.date), FORMAT)} {" "}
                    </span>
                    <hr />
                </div>
            ));
    }

    return tasks.map(task => (
        <div>
            <span>
                {task.text}{"   --->   "}
            </span>
            <span>{dateFnsFormat(new Date(task.date), FORMAT)} {" "}</span>
            <hr />
        </div>
    ));

}

function Tasks({ selectedTab }) {
    const [showAddtask, setshowAddtask] = useState(false);
    // const [const tasks: any[] AddTask]=useState(false);
    const [tasks, settasks] = useState([]);

    const addNewTask = (text, date) => {
        const newTaskItem = { text, date: date || new Date() }
        settasks((prevState) => [...prevState, newTaskItem])
    };

    return (
        <div className="tasks">
            <h1>{TASK_HEADER_MAPPING[selectedTab]}</h1>
            {selectedTab === 'INBOX' ? (<div className="add-task-btn"
                onClick={() => setshowAddtask((prevState => !prevState))}
            >
                <span className="plus">+ </span>
                <span className="add-task-text">Add Task </span>
                <br></br>{"    "}
            </div>) : null}
            {showAddtask && <AddTask onAddTask={addNewTask} onCancel={() => setshowAddtask(false)} />}
            {tasks.length > 0 ? (
                // tasks.map((task) => (
                < TaskItems tasks={tasks} selectedTab={selectedTab} />
            ) : (
                <p>No Task yet</p>
            )}
        </div>
    )
}

export default Tasks;
