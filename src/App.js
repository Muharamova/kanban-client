import './App.css';
//import axios from 'axios';
import axios from 'axios';
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.css';
import Column from "./components/Column";



function App() {
    const [tasks, setTasks] = useState([]);
    const [statuses, setStatuses] = useState([]);
    const [priorities, setPriorities] = useState([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10])

    const  deleteTask = (id) => {
       axios.delete(`http://localhost:3001/tasks/${id}`)
           .then((res) =>
             getTasks()
           )
           .catch((error) => alert('Cannot delete'))
    }
    const  changeTaskStatus = (task, direction) => {
        const newStatusesStringArray = statuses.map((status) => status.name);
        const currentStatusIndex = newStatusesStringArray.indexOf(task.status);
        const newStatusIndex = currentStatusIndex + (direction === 'right' ? +1 : -1);
        const newStatus = newStatusesStringArray[newStatusIndex];
        axios.patch(`http://localhost:3001/tasks/${task._id}`, {status: newStatus})
            .then((res) =>
               getTasks()
            )
            .catch((error) => alert('Failed'))
    }
  const getStatuses = () => {
      axios.get('http://localhost:3001/statuses')
          .then((res) =>
          setStatuses(res.data)
          )
          .catch((error) =>
              console.log(error)
          )
  }
    const getTasks = () => {
      axios.get('http://localhost:3001/tasks')
          .then((res) =>
              setTasks(res.data)
          )
          .catch((error) =>
          console.log(error)
          )
    }
    const changeTask = (updatedTask, id) => {
       axios.patch(`http://localhost:3001/tasks/${id}`, updatedTask)
           .then((res) =>
           getTasks()
           )
           .catch((error) =>
            alert('Failed')
           )
    }

    const createStatus = (newStatus) => {
        axios.post('http://localhost:3001/statuses', newStatus)
            .then(function (response) {
               getStatuses();
            })
            .catch( (error) => {

                console.log(error);
            })
            .finally(function () {
                console.log('Get is done')
            });
    }
    useEffect(() => {
        getStatuses()
        getTasks()

    }, []);
  return (
      <div className="App">
          <h1>Kanban Board</h1>


          <div className="container text-center">
              <div className="row align-items-start">
                  {statuses.map((status) =>
                      <Column status={status}
                              tasks={tasks}
                              key={status._id}
                              changeTask={changeTask}
                              priorities={priorities}
                              changeTaskStatus={changeTaskStatus}
                              deleteTask={deleteTask}

                      />
                  )}

              </div>
          </div>
      </div>
  );
}

export default App;
