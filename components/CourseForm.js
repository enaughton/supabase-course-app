import { Auth } from "@supabase/ui";
import { useState } from "react";
import { supabase } from "../lib/initSupabase";

export default function Todos({ users }) {
  const [courses, setCourses] = useState([]);
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseDescription, setNewCourseDescription] = useState("");
  const [errorText, setError] = useState("");
  const { user } = Auth.useUser();

  const fetchCourses = async () => {
    let { data: courses, error } = await supabase
      .from("courses")
      .select("*")
      .order("id", true);
    if (error) console.log("error", error);
    else setCourses(courses);
  };

  const addCourse = async (courseText) => {
    let title = courseText.trim();
    let description = newCourseDescription;
    if (title.length) {
      let { data: course, error } = await supabase
        .from("courses")
        .insert({ title, description, user_id: user.id })
        .single();
      if (error) setError(error.message);
      else setCourses([...courses, course]);
    }
  };

  return (
    <div>
      <div className="gap-2 my-2 ">
        <input
          className="w-full p-2 rounded"
          type="text"
          placeholder="Course Title"
          value={newCourseTitle}
          onChange={(e) => {
            setError("");
            setNewCourseTitle(e.target.value);
          }}
        />
        <div className="gap-2 my-2 ">
          <textarea
            className="w-full p-2 rounded"
            type="text"
            placeholder="Course description"
            value={newCourseDescription}
            onChange={(e) => {
              setError("");
              setNewCourseDescription(e.target.value);
            }}
          />
        </div>
      </div>

      <button className="btn-black" onClick={() => addCourse(newCourseTitle)}>
        Add
      </button>
    </div>
  );
}
