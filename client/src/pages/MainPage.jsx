import { useAuth } from "../context/AuthProvider";

function MainPage() {
  const { user } = useAuth();
  console.log("user", user);

  return (
    <div className="text-white">
      {user && (<h1 className="text-white">WELCOME!</h1>)}
    </div>
  );
}

export default MainPage;
