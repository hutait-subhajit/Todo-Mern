import React, { useState } from 'react'
import "../style/Addtask.css"
import { useNavigate } from 'react-router-dom'

const AddTask = () => {
    const navigate = useNavigate()
    const [taskData, setTaskData] = useState()
    const [disabled, setDisabled] = useState(false)
    const handleClick = async () => {
        setDisabled(true)
        console.log(taskData)
        let result = await fetch("http://localhost:3200/add-task", {
            method: "Post",
            body: JSON.stringify(taskData),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        result = await result.json()
        if (result) {
            alert("Task added successfully")
            setTaskData({ title: "", description: "" })
            navigate("/")
        }
        setDisabled(false)
    }
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
                        onClick={handleClick}
                        disabled={disabled}
                        style={{
                            cursor: disabled ? "not-allowed" : "pointer"
                        }}
                    >
                        Add Task
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddTask