import { Auth } from "@supabase/ui";

import Link from "next/link";

export default function IndexPage() {
  const { user } = Auth.useUser();

  return (
    <div className="w-full h-full bg-gray-300">
      <div>
        <h1 className="mb-12 ml-4">Course App. </h1>
        <button className="p-2 m-4 text-white bg-blue-500 rounded-lg">
          <Link href="/courses/new">Create a new course</Link>
        </button>
        <button className="p-2 m-4 text-white bg-blue-500 rounded-lg">
          <Link href="/courses/:id/edit">Edit course</Link>
        </button>
      </div>
    </div>
  );
}
