import { supabase } from "../lib/initSupabase";
import { Auth } from "@supabase/ui";
import TodoList from "../components/TodoList";

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
          <TodoList user={supabase.auth.user()} />
        </div>
      )}
    </div>
  );
}
