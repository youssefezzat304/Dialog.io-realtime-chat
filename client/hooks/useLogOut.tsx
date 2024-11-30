import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { axiosPrivate } from "@/api/axios";
import useUserStore from "@/services/stores/user.store";
import { db } from "@/utils/indexedDB";

const useLogOut = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const setUser = useUserStore((state) => state.setUser);

  const handleLogOut = async () => {
    localStorage.clear();
    db.recentChatsDB.clear();
    queryClient.removeQueries({ queryKey: ["currentUser"], exact: true });
    setUser(null);
    try {
      await axiosPrivate.get("/users/logout", {
        withCredentials: true,
      });
      router.push("/register");
    } catch (error: any) {
      console.log(error);
    } finally {
      router.push("/register");
    }
  };

  return { handleLogOut };
};

export default useLogOut;
