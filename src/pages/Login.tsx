
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShieldCheck } from "lucide-react";

const Login = () => {
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
              Login to access your logistics dashboard
            </p>
          </div>
          
          <Alert className="mb-6 bg-amber-50 border-amber-200 text-amber-800">
            <ShieldCheck className="h-4 w-4 text-amber-600" />
            <AlertDescription>
              <strong>Test Account:</strong> Username: test_user | Password: password123
            </AlertDescription>
          </Alert>
          
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default Login;
