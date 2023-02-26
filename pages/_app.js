import { Auth } from "@supabase/ui";
import { supabase } from "../lib/initSupabase";
import "../styles/index.css";
import Header from "../components/Header";

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="w-full h-full bg-gray-300">
      <Auth.UserContextProvider supabaseClient={supabase}>
        <Header />
        <Component {...pageProps} />
      </Auth.UserContextProvider>
    </div>
  );
}
