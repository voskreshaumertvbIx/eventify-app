import { CiUser, CiLogout } from "react-icons/ci";

import { useRouter } from "next/navigation";
import { useLogoutMutation } from "../redux/userQuerry/userApi";

const UserMenuModal = () => {
  const [logout] = useLogoutMutation();
  const router = useRouter();

  const handleUserProfile = () => {
    router.replace("/dashboard/userprofile");
  };

  const handleLogOut = () => {
    logout();

    router.replace("/");
  };
  return (
    <section className="absolute left-2 right-3 flex h-[300px] w-[250px] flex-col rounded-xl border border-black p-5 dark:border-white">
      <div className="menu-item" onClick={() => handleUserProfile()}>
        <CiUser className="icon" />
        <p>Profile</p>
      </div>
      <div className="menu-item" onClick={() => handleLogOut()}>
        <CiLogout className="icon" />
        <p>Log Out</p>
      </div>
    </section>
  );
};

export default UserMenuModal;
