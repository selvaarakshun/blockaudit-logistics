
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const Login = () => {
  const { isAuthenticated } = useAuth();
  
  // If already logged in, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  
  return (
    <div className="min-h-screen flex flex-col w-full bg-gradient-to-b from-logistics-light-blue/10 to-white dark:from-logistics-blue/5 dark:to-logistics-dark">
      <div className="flex-grow flex items-center justify-center p-4">
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <motion.h1 
              className="text-3xl md:text-4xl font-bold text-logistics-blue mb-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              GuudzChain
            </motion.h1>
            <motion.p 
              className="text-logistics-gray dark:text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              Login to access your logistics dashboard
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Alert className="mb-6 bg-amber-50 border-amber-200 text-amber-800 dark:bg-amber-900/20 dark:border-amber-800/30 dark:text-amber-300">
              <ShieldCheck className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              <AlertDescription>
                <strong>Test Account:</strong> Username: test_user | Password: password123
              </AlertDescription>
            </Alert>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <div className="bg-white dark:bg-logistics-dark/50 p-6 rounded-xl shadow-subtle border border-gray-100 dark:border-gray-800">
              <LoginForm />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
