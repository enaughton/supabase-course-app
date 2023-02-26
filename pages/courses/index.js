import { supabase } from "../../lib/initSupabase";
import { Auth } from "@supabase/ui";
import CourseForm from "../../components/CourseForm";
import Link from "next/link";

export default function IndexPage() {
  const { user } = Auth.useUser();

  return (
    <div className="w-full h-full bg-gray-300">
      {!user ? (
        <div>
          <div>
            <Auth
              supabaseClient={supabase}
              providers={["google", "github"]}
              socialLayout="horizontal"
              socialButtonSize="xlarge"
            />
          </div>
        </div>
      ) : (
        <div>
          <button className="p-2 m-4 text-white bg-blue-500 rounded-lg">
            <Link href="/courses/new">Create a new course</Link>
          </button>
          <button className="p-2 m-4 text-white bg-blue-500 rounded-lg">
            <Link href="/courses/:id/edit">Edit course</Link>
          </button>
        </div>
      )}
    </div>
  );
}
