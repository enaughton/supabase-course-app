import { supabase } from "../lib/initSupabase";
import { Auth } from "@supabase/ui";
import TodoListPrisma from "../components/CourseForm";

export default function test() {
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
        <div
          className="flex flex-col items-center justify-center w-full h-full p-4"
          style={{ minWidth: 250, maxWidth: 600, margin: "auto" }}
        >
          <TodoListPrisma user={supabase.auth.user()} />

          <p>{user.course}</p>
        </div>
      )}
    </div>
  );
}
