import React, { useEffect, useState } from 'react'
import '../style/list.css'
import { Link } from 'react-router-dom'

const List = () => {
    const [data, setData] = useState()
    const getData = async () => {
        let result = await fetch("http://localhost:3200/tasks")
        result = await result.json()
        setData(result.result)
    }
    useEffect(() => {
        getData()
    }, [])

    const handleDelete = async (id) => {
        let result = await fetch(`http://localhost:3200/tasks/${id}`, {
            method: "Delete"
        })
        result = await result.json()
        if (result.success) {
            alert("Task deleted successfully")
            getData()
        }
    }
    console.log(data)
    return (
        <div className='listContainer'>
            <h1>List</h1>
            <ul className='taskList'>
                <li className='listHeader'>S.L</li>
                <li className='listHeader'>Title</li>
                <li className='listHeader'>Description</li>
                <li className='listHeader'>Action</li>
                {
                    data && data.map((item, index) => {
                        return (
                            <React.Fragment key={item._id}>
                                <li className='listItem'>{index + 1}</li>
                                <li className='listItem'>{item?.title}</li>
                                <li className='listItem'>{item?.description}</li>
                                <li className='listItem'>
                                    <button
                                        className='deleteButton'
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        Delete
                                    </button>
                                    <Link to={`/update/${item._id}`}
                                        style={{ textDecoration: "none" }}
                                    >
                                        <button className='updateButton'>Update</button>
                                    </Link>
                                </li>
                            </React.Fragment>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default List