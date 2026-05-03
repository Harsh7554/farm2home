import Profile from "../components/profile";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";


export default function ProfilePage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      
      <Sidebar />

      <div className="ml-64 w-full">
        <Topbar title="My Profile" />

        <div className="p-6">
          <Profile/>
        </div>
      </div>

    </div>
  );
}