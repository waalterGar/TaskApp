import { Form, Formik } from "formik";
import {  useSessions } from "../context/SessionProvider";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function SessionForm() {
  const { createSession, getSession, updateSession } = useSessions();
  const [session, setSession] = useState({
    name: "",
    description: "",
    session_date: "",
    trainer_notes: "",
  }); 
  const params = useParams();
  const navigate = useNavigate();

  useEffect( () => {
    const loadSession = async () => {
      if (params.id) {
        const session = await getSession(params.id);
        console.log("usefect",session);
        setSession({
            name: session.name,
            description: session.description,
            session_date: session.session_date,
            trainer_notes: session.trainer_notes,
        });
      }
    };
    loadSession();
  }, []);
  return (
    <div className="">
      <Formik
        initialValues={session}
        enableReinitialize={true}
        onSubmit={async (values, actions) => {
          console.log(values, params);
          if(params.id){
            await updateSession(params.id, values);
            navigate("/");
        } 
        
          if (params.idRoutine) {
            await createSession(values, params.idRoutine);
        }

        setSession({
            name: "",
            description: "",
            session_date: "",
            trainer_notes: "", 
        });
      }}
      >
        {({ handleChange, handleSubmit, values, isSubmitting }) => (
          <Form onSubmit={handleSubmit} className="bg-zinc-700 text-white max-w-sm rounded-md p-4 mx-auto">
            <h1 className="text-xl font-bold uppercase text-center">{params.id ? "Edit Session" : "New Session"}</h1>
            <label className="block">name</label>
            <input
              type="text"
              name="name"
              className="bg-zinc-900 px-2 py-1 rounded-sm w-full"
              placeholder="Write a name"
              onChange={handleChange}
              value={values.name}
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

            <label className="block">Session date</label>
            <input
              type="text"
              name="session_date"
              className="bg-zinc-900 px-2 py-1 rounded-sm w-full"
              placeholder="Write a name"
              onChange={handleChange}
              value={values.session_date}
            />

            <label className="block">Trainer notes</label>
            <textarea
              name="trainer_notes"
              rows="5"
              className="bg-zinc-900 px-2 py-1 rounded-sm w-full"
              placeholder="Write a description"
              onChange={handleChange}
              value={values.trainer_notes}
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

export default SessionForm;
