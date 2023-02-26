import { supabase } from "../../lib/initSupabase";
import { Auth } from "@supabase/ui";
import CourseForm from "../../components/CourseForm";

export default function IndexPage() {
  const { user } = Auth.useUser();

  return (
    <div className="w-full h-full bg-gray-300">
      {!user ? (
        <div className="flex items-center justify-center w-full h-full p-4">
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
          <h2 className="ml-4">Create a New Course </h2>

          <div className="flex flex-col justify-center w-3/4 h-full p-4">
            <CourseForm user={supabase.auth.user()} />
          </div>
        </div>
      )}
    </div>
  );
}
