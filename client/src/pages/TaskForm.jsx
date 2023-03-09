import { Form, Formik } from "formik";
import { useTasks } from "../context/TaskProvider";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function TaskForm() {
  const { createTask, getTask, updateTask } = useTasks();
  const [task, setTask] = useState({
    title: "",
    description: "",
  }); 
  const params = useParams();
  const navigate = useNavigate();

  useEffect( () => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);
        console.log("usefect",task);
        setTask({
          title: task.title,
          description: task.description,
        });
      }
    };
    loadTask();
  }, []);
  return (
    <div className="">
      <Formik
        initialValues={task}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          console.log(values);
          if(params.id){
            await updateTask(params.id, values);
            navigate("/");
        } else {
            await createTask(values);
        }

        setTask({
          title: "",
          description: "",
        });
      }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className="bg-zinc-700 text-white max-w-sm rounded-md p-4 mx-auto mt-20">
            <h1 className="text-xl font-bold uppercase text-center">{params.id ? "Edit Task" : "New Task"}</h1>
            <label className="block">title</label>
            <input
              type="text"
              name="title"
              className="bg-zinc-900 px-2 py-1 rounded-sm w-full"
              placeholder="Write a title"
              onChange={handleChange}
              value={values.title}
            />

            <label className="block">description</label>
            <textarea
              name="description"
              rows="3"
              className="bg-zinc-900 px-2 py-1 rounded-sm w-full"
              placeholder="Write a description"
              onChange={handleChange}
              value={values.description}
            ></textarea>

            <button type="submit" disabled={isSubmitting} className="block bg-indigo-500 px-2 py-1 text-white w-full rounded-md">
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TaskForm;
