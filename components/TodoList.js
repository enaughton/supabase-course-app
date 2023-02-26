import { PrismaClient } from "@prisma/client";
import { useState, useEffect } from "react";
import { supabase } from "../lib/initSupabase";

export default function Todos({ user }) {
  const [courses, setCourses] = useState([]);
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [errorText, setError] = useState("");

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

  const deleteTodo = async (id) => {
    try {
      await supabase.from("courses").delete().eq("id", id);
      setCourses(course.filter((x) => x.id != id));
    } catch (error) {
      console.log("error", error);
    }
  };

  console.log(fetchCourses(courses));

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

const Course = ({ course, onDelete }) => {
  const [isPublic, setIsPublic] = useState(course.is_public);

  const toggle = async () => {
    try {
      const { data, error } = await supabase
        .from("courses")
        .update({ is_complete: !isCompleted })
        .eq("id", course.id)
        .single();
      if (error) {
        throw new Error(error);
      }
      setIsPublic(data.is_public);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <li
      onClick={(e) => {
        e.preventDefault();
        toggle();
      }}
      className="block w-full transition duration-150 ease-in-out cursor-pointer hover:bg-gray-200 focus:outline-none focus:bg-gray-200"
    >
      <div className="flex items-center px-4 py-4 sm:px-6">
        <div className="flex items-center flex-1 min-w-0">
          <div className="text-sm font-medium leading-5 truncate">
            {course.title}
          </div>
        </div>
        <div>
          <input
            className="cursor-pointer"
            onChange={(e) => toggle()}
            type="checkbox"
            checked={isPublic ? true : ""}
          />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete();
          }}
          className="w-4 h-4 ml-2 border-2 rounded hover:border-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="gray"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </li>
  );
};

const Alert = ({ text }) => (
  <div className="p-4 my-3 bg-red-100 rounded-md">
    <div className="text-sm leading-5 text-red-700">{text}</div>
  </div>
);
