
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import LoginForm from "./LoginForm";

const LoginContainer = () => {
  return (
    <div className="auth-container">
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
            <Alert className="auth-alert">
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
            <div className="auth-card">
              <LoginForm />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginContainer;
