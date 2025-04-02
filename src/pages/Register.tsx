
import RegisterForm from "@/components/auth/RegisterForm";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";

const Register = () => {
  const { isAuthenticated } = useAuth();
  
  // If already logged in, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow flex items-center justify-center p-4 bg-logistics-light-gray dark:bg-logistics-dark">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-logistics-blue mb-2">GuudzChain</h1>
            <p className="text-logistics-gray dark:text-gray-400">
              Register to start using our logistics platform
            </p>
          </div>
          
          <RegisterForm />
        </div>
      </div>
    </div>
  );
};

export default Register;
