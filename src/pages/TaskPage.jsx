import { useEffect, useState } from "react";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskFilters from "../components/TaskFilters";
import "./TaskPage.css";

const TaskPage = () => {
    const [list, setList] = useState([]);
    const [filtersObj, setFiltersObj] = useState({
        priority: "",
    });

    const getData = async () => {
        const query = [];
        if (filtersObj.priority) {
            query.push(`priority=${filtersObj.priority}`);
        }
        const resp = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/tasks?${query.join("&")}`,
            {
                credentials: "include",
            }
        );
        const respBody = await resp.json();
        const arrayOfTaskList = respBody.data.tasks;
        setList(arrayOfTaskList);
    };

    useEffect(() => {
        getData();
    }, [filtersObj]);

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Welcome to Task Management Tool!</h2>
            <div style={styles.content}>
                <TaskForm getData={getData} />
                <TaskFilters setFiltersObj={setFiltersObj} />
                <div style={styles.taskLists}>
                    <TaskList
                        list={list}
                        getData={getData}
                        filterObj={{ status: "todo" }}
                        title="Todo List"
                    />
                    <TaskList
                        list={list}
                        getData={getData}
                        filterObj={{ status: "done" }}
                        title="Done List"
                    />
                </div>
            </div>
        </div>
    );
};

// Styling
const styles = {
    container: {
        padding: "2rem",
        backgroundColor: "#f5f5f5",
        minHeight: "100vh",
    },
    title: {
        textAlign: "center",
        color: "#333",
        marginBottom: "1.5rem",
    },
    content: {
        maxWidth: "1200px",
        margin: "0 auto",
    },
    taskLists: {
        display: "flex",
        gap: "1.5rem",
        marginTop: "1.5rem",
    },
};

export default TaskPage;