import { useState } from "react";
import "./TaskList.css";

const TaskList = ({ list, getData, filterObj, title }) => {
    const [editTask, setEditTask] = useState(-1);
    const [editObject, setEditObject] = useState({});

    const handleEditField = (key, value) => {
        setEditObject((prev) => ({ ...prev, [key]: value }));
    };

    const handleEditData = async () => {
        const resp = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/tasks/${editObject._id}`,
            {
                method: "PATCH",
                body: JSON.stringify(editObject),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const respObj = await resp.json();
        if (respObj.status === "success") {
            setEditTask(-1);
            setEditObject({});
            getData();
        } else {
            alert(respObj.message);
        }
    };

    const handleDelete = async (taskId) => {
        const resp = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/tasks/${taskId}`,
            {
                method: "DELETE",
            }
        );
        if (resp.status === 204) {
            getData();
        } else {
            alert("Error in delete");
        }
    };

    const handleMarkAsDone = async (taskId) => {
        const resp = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/tasks/${taskId}`,
            {
                method: "PATCH",
                body: JSON.stringify({ status: "done" }),
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        const respObj = await resp.json();
        if (respObj.status === "success") {
            getData();
        } else {
            alert(respObj.message);
        }
    };

    const filteredList = list.filter((elem) => elem.status === filterObj.status);

    return (
        <div style={styles.taskList}>
            <h3 style={styles.taskListTitle}>{title}</h3>
            <div style={styles.taskContainer}>
                {filteredList.map((elem, idx) => (
                    <div key={elem._id} style={styles.taskCard}>
                        <h5 style={styles.taskTitle}>{elem.taskTitle}</h5>
                        <p style={styles.taskAssignee}>Assignee: {elem.assignee}</p>
                        <p style={styles.taskDeadline}>Deadline: {elem.deadline}</p>
                        <p style={styles.taskPriority}>Priority: {elem.priority}</p>
                        {idx === editTask ? (
                            <div style={styles.editForm}>
                                <input
                                    value={editObject.assignee}
                                    onChange={(e) =>
                                        handleEditField("assignee", e.target.value)
                                    }
                                    style={styles.editInput}
                                />
                                <select
                                    value={editObject.priority}
                                    onChange={(e) =>
                                        handleEditField("priority", e.target.value)
                                    }
                                    style={styles.editInput}
                                >
                                    <option value="normal">Normal</option>
                                    <option value="low">Low</option>
                                    <option value="high">High</option>
                                    <option value="urgent">Urgent</option>
                                </select>
                                <button onClick={handleEditData} style={styles.editButton}>
                                    Save
                                </button>
                                <button
                                    onClick={() => setEditTask(-1)}
                                    style={styles.editButton}
                                >
                                    Cancel
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => {
                                    setEditObject(elem);
                                    setEditTask(idx);
                                }}
                                style={styles.editButton}
                            >
                                Edit
                            </button>
                        )}
                        <button
                            onClick={() => handleDelete(elem._id)}
                            style={styles.deleteButton}
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => handleMarkAsDone(elem._id)}
                            style={styles.doneButton}
                        >
                            Mark as Done
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Styling
const styles = {
    taskList: {
        flex: 1,
        backgroundColor: "white",
        padding: "1.5rem",
        borderRadius: "8px",
        boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    },
    taskListTitle: {
        color: "#333",
        marginBottom: "1rem",
    },
    taskContainer: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
    },
    taskCard: {
        backgroundColor: "#f9f9f9",
        padding: "1rem",
        borderRadius: "8px",
        border: "1px solid #ddd",
    },
    taskTitle: {
        color: "#333",
        marginBottom: "0.5rem",
    },
    taskAssignee: {
        color: "#666",
        marginBottom: "0.5rem",
    },
    taskDeadline: {
        color: "#666",
        marginBottom: "0.5rem",
    },
    taskPriority: {
        color: "#666",
        marginBottom: "0.5rem",
    },
    editForm: {
        display: "flex",
        gap: "0.5rem",
        marginBottom: "0.5rem",
    },
    editInput: {
        padding: "0.5rem",
        borderRadius: "4px",
        border: "1px solid #ddd",
    },
    editButton: {
        backgroundColor: "#007bff",
        color: "white",
        padding: "0.5rem 1rem",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
    deleteButton: {
        backgroundColor: "#ff4d4d",
        color: "white",
        padding: "0.5rem 1rem",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        marginRight: "0.5rem",
    },
    doneButton: {
        backgroundColor: "#28a745",
        color: "white",
        padding: "0.5rem 1rem",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    },
};

export default TaskList;