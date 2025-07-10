import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import getSongs from "./getSongs";

const getSongsByTitle = async (title: string): Promise<Song[]> => {
    const cookieStore = await cookies(); // ✅ await it

    const supabase = createServerComponentClient({
        cookies: () => cookieStore // ✅ pass a function that returns the cookies
    });

    if (!title) {
        const allSongs = await getSongs();
        return allSongs;
    }

    const { data, error } = await supabase
        .from("songs")
        .select("*")
        .ilike('title', `%${title}%`)
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching songs:", error);
    }

    return data || [];
};

export default getSongsByTitle;
