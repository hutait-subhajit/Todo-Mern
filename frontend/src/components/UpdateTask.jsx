import React, { useEffect, useState } from 'react'
import "../style/Addtask.css"
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const UpdateTask = () => {
    const navigate = useNavigate()
    const [taskData, setTaskData] = useState()
    const [disabled, setDisabled] = useState(true)
    const id = useParams().id;

    useEffect(() => {
        getData(id)
    }, [])

    const getData = async (id) => {
        setDisabled(true)
        try {
            let fetchData = await fetch(`http://localhost:3200/task/${id}`);
            let result = await fetchData.json();
            alert(result?.message)
            setTaskData(result?.result)
            setDisabled(false)
        } catch (error) {
            alert(result?.message)
        }
    }

    // const handleUpdate = async () => {
    //     let task = await fetch("http://localhost:3200/task-update", {
    //         method: 'put',
    //         body: JSON.stringify(taskData),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     })
    //     task = await task.json()
    //     if (task.success) {
    //         alert(task.message)
    //         navigate("/")
    //     }
    // }

    const handleUpdate = async () => {
        try {
            const res = await fetch("http://localhost:3200/task-update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(taskData),
            });
            const data = await res.json();

            if (data.success) {
                alert(data.message);
                navigate("/");
            } else {
                alert(data.message || "Update failed!");
            }
        } catch (err) {
            console.error("Update error:", err);
            alert("Something went wrong!");
        }
    };


    return (
        <div className='addTaskContainer'>
            <h1 className='addTaskTitle'>Add Task</h1>
            <div className='forms'>
                <div className='inputContainer'>
                    <label htmlFor="">Title</label>
                    <input
                        type="text"
                        placeholder='Enter task title'
                        className='inputBox'
                        value={taskData?.title}
                        onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                    />
                </div>

                <div className='inputContainer'>
                    <label htmlFor="">Descripton</label>
                    <textarea
                        name=""
                        id=""
                        placeholder='Enter task description'
                        className='inputBox'
                        style={{ resize: "none" }}
                        rows={5}
                        value={taskData?.description}
                        onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                    >
                    </textarea>
                </div>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end"
                    }}
                >
                    <button
                        className='submit'
                        onClick={handleUpdate}
                        disabled={disabled}
                        style={{
                            cursor: disabled ? "not-allowed" : "pointer"
                        }}
                    >
                        update Task
                    </button>
                </div>
            </div>
        </div>
    )
}

export default UpdateTask