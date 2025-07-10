import { Song } from "@/types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

const getSongsByUserId = async (): Promise<Song[]> => {
    const cookieStore = cookies(); // ✅ await it

    const supabase = createServerComponentClient({
        cookies: () => cookieStore // ✅ pass a function that returns the cookies
    });

    const { data: { user }, error: sessionError } = await supabase.auth.getUser();

    if (sessionError) {
        console.log(sessionError.message);
        return[];
    }

    const { data, error } = await supabase
    .from('songs')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false} );

    if (error) {
        console.log(error.message);
    }

    return (data as any) || [];
};

export default getSongsByUserId;
