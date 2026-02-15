import React, { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router";
import Button from "../../components/Shared/Button";

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) return <p>Loading...</p>; // simple loading fallback

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="min-h-[80vh] flex justify-center items-start p-6">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
        <div className="flex flex-col items-center">
          {/* Profile Image */}
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-purple-400 mb-4">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-500">
                No Image
              </div>
            )}
          </div>

          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-1">
            {user.displayName || "Unnamed User"}
          </h2>

          {/* Email */}
          <p className="text-gray-500 dark:text-gray-300 mb-2">{user.email}</p>

          {/* Logout Button */}
          <Button
            onClick={handleLogout}
            variant="secondary"
            size="md"
            className="w-full mb-4"
          >
            Logout
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Profile;
