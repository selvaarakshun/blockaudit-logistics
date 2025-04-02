
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types for our authentication context
type User = {
  id: string;
  username: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  allUsers: User[];
};

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  allUsers: [],
});

// Sample user data for demonstration
const sampleUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
  }
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [allUsers, setAllUsers] = useState<User[]>([]);

  // On mount, check if user is already logged in via localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const storedUsers = localStorage.getItem('users');
    
    if (storedUsers) {
      setAllUsers(JSON.parse(storedUsers));
    } else {
      // Initialize with sample users
      localStorage.setItem('users', JSON.stringify(sampleUsers));
      setAllUsers(sampleUsers);
    }
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (username: string, password: string) => {
    // In a real app, you'd validate against a backend
    // For demo purposes, we're just checking if the user exists in our sample data
    
    // Get users from localStorage
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : sampleUsers;
    
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const foundUser = users.find((u: User) => u.username === username);
    
    if (!foundUser) {
      throw new Error('Invalid username or password');
    }
    
    // In a real implementation, you'd check the password hash
    // Here we're just simulating successful login
    
    setUser(foundUser);
    localStorage.setItem('currentUser', JSON.stringify(foundUser));
  };

  // Register function
  const register = async (username: string, email: string, password: string) => {
    // Get current users
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) : sampleUsers;
    
    // Check if username already exists
    if (users.some((u: User) => u.username === username)) {
      throw new Error('Username already taken');
    }
    
    // Check if email already exists
    if (users.some((u: User) => u.email === email)) {
      throw new Error('Email already registered');
    }
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create new user
    const newUser = {
      id: Date.now().toString(),
      username,
      email
    };
    
    // Update users list
    const updatedUsers = [...users, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setAllUsers(updatedUsers);
    
    // Log in the new user
    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading,
      login,
      register,
      logout,
      allUsers
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);
