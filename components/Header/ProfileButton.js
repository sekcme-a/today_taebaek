import { createServerSupabaseClient } from "@/utils/supabase/server";
import Link from "next/link";

const ProfileButton = async () => {
  const supabase = await createServerSupabaseClient();
  const { data: session } = await supabase.auth.getSession();

  return (
    <Link
      href={!session.session ? "/profile" : "/login"}
      aria-label="프로필로 이동"
    >
      <div className="pl-3 pr-3">
        <i className="fa-solid fa-user"></i>
      </div>
    </Link>
  );
};

export default ProfileButton;
