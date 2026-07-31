const { logout } = useAuth();
const navigate = useNavigate();

const handleLogout = async () => {
  try {
    await logoutUser(); // API call to POST /logout
    logout();           // Clear AuthContext
    navigate("/login");
  } catch (error) {
    console.error(error);
  }
};