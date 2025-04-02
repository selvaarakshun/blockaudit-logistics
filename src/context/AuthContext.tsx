
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define types for our authentication context
type User = {
  id: string;
  username: string;
  email: string;
  isTestAccount?: boolean;
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

// Extend the user type to include passwords for local storage
type StoredUser = User & { password: string };

// Sample user data for demonstration with test account
const sampleUsers: StoredUser[] = [
  {
    id: '1',
    username: 'test_user',
    email: 'test@example.com',
    password: 'password123',
    isTestAccount: true,
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
      // Get users but remove passwords for security when exposing to UI
      const parsedUsers = JSON.parse(storedUsers) as StoredUser[];
      setAllUsers(parsedUsers.map(({ password, ...user }) => user));
    } else {
      // Initialize with sample users
      localStorage.setItem('users', JSON.stringify(sampleUsers));
      setAllUsers(sampleUsers.map(({ password, ...user }) => user));
    }
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (username: string, password: string) => {
    // Get users from localStorage
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) as StoredUser[] : sampleUsers;
    
    // Simulate authentication delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user by username
    const foundUser = users.find((u: StoredUser) => u.username === username);
    
    if (!foundUser) {
      throw new Error('Invalid username or password');
    }
    
    // Verify password
    if (foundUser.password !== password) {
      throw new Error('Invalid username or password');
    }
    
    // Remove password from user object before setting to state
    const { password: _, ...secureUser } = foundUser;
    
    setUser(secureUser);
    localStorage.setItem('currentUser', JSON.stringify(secureUser));
  };

  // Register function
  const register = async (username: string, email: string, password: string) => {
    // Get current users
    const storedUsers = localStorage.getItem('users');
    const users = storedUsers ? JSON.parse(storedUsers) as StoredUser[] : sampleUsers;
    
    // Check if username already exists
    if (users.some((u: StoredUser) => u.username === username)) {
      throw new Error('Username already taken');
    }
    
    // Check if email already exists
    if (users.some((u: StoredUser) => u.email === email)) {
      throw new Error('Email already registered');
    }
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create new user
    const newUser: StoredUser = {
      id: Date.now().toString(),
      username,
      email,
      password,
      isTestAccount: false // New users are not test accounts
    };
    
    // Update users list
    const updatedUsers = [...users, newUser];
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    
    // Update allUsers state with password removed
    const { password: _, ...secureUser } = newUser;
    setAllUsers([...allUsers, secureUser]);
    
    // Log in the new user
    setUser(secureUser);
    localStorage.setItem('currentUser', JSON.stringify(secureUser));
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
