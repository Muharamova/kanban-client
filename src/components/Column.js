import React from 'react';
import Card from "./Card";

const Column = ({status,tasks,changeTask,priorities,changeTaskStatus,deleteTask}) => {
    return (
        <div className="col">
         <h2>{status.name}</h2>
            {tasks.filter((task)=> task.status === status.name).map((task) =>
            <Card task={task}
                   key={task._id}
                  changeTask={changeTask}
                  priorities={priorities}
                  changeTaskStatus={changeTaskStatus}
                  deleteTask={deleteTask}
            />
            )}

        </div>
    );
};

export default Column;