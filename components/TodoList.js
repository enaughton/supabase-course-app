import { useState, useEffect } from "react";
import { supabase } from "../lib/initSupabase";

export default function Todos({ user }) {
  const [courses, setCourses] = useState([]);
  const [newCourseTitle, setNewCourseTitle] = useState("");

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
    if (title.length) {
      let { data: course, error } = await supabase
        .from("courses")
        .insert({ title, user_id: user.id })
        .single();
      if (error) setError(error.message);
      else setCourses([...courses, course]);
    }
  };

  return (
    <div className="w-1/2">
      {!!errorText && <Alert text={errorText} />}
      <div className="flex flex-wrap justify-center p-4 m-4 bg-white shadow">
        {courses.map((course) => (
          <div
            key={course.id}
            className="items-center p-2 m-4 border border-black rounded-lg "
          >
            <h3 className="text-lg">{course.title}</h3>
            <span className="">
              {course.description
                ? `${course.description}`
                : "needs a description"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
