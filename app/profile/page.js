"use client";

import { createBrowserSupabaseClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createBrowserSupabaseClient();
    await supabase.auth.signOut();
    router.replace("/");
  };

  return (
    <div>
      <p onClick={handleLogout}>로그아웃</p>
    </div>
  );
};

export default Profile;
