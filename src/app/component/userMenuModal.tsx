import { CiUser, CiLogout } from "react-icons/ci";
import { clearUser } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const UserMenuModal = () => {
  const dispatch = useDispatch();
  const router = useRouter()

  const handleUserProfile =()=>{
   router.push('/pages/userprofile')
  }

  const handleLogOut = () =>{
    dispatch(clearUser())
    router.push('/')
  }
  return (
    <section className="absolute right-3 left-2 w-[250px] h-[300px] border dark:border-white border-black rounded-xl flex flex-col p-5">
      <div className="menu-item" onClick={()=>handleUserProfile()}>
        <CiUser className="icon" />
        <p>Profile</p>
      </div>
      <div className="menu-item" onClick={()=> handleLogOut()}>
        <CiLogout className="icon" />
        <p>Log Out</p>
      </div>
    </section>
  );
};

export default UserMenuModal;
