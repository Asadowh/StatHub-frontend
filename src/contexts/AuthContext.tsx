import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  username: string;
  fullName: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  signup: (email: string, username: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  resetPassword: (email: string) => Promise<{ success: boolean; error?: string }>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('stathub_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call - in real app, this would call backend
    const storedUsers = JSON.parse(localStorage.getItem('stathub_users') || '[]');
    const foundUser = storedUsers.find(
      (u: any) => u.email === email && u.password === password
    );

    if (foundUser) {
      const userSession = {
        id: foundUser.id,
        email: foundUser.email,
        username: foundUser.username,
        fullName: foundUser.fullName,
      };
      setUser(userSession);
      localStorage.setItem('stathub_user', JSON.stringify(userSession));
      return { success: true };
    }

    return { success: false, error: 'Invalid email or password' };
  };

  const signup = async (email: string, username: string, password: string) => {
    // Simulate API call - check if user already exists
    const storedUsers = JSON.parse(localStorage.getItem('stathub_users') || '[]');
    const existingUser = storedUsers.find(
      (u: any) => u.email === email || u.username === username
    );

    if (existingUser) {
      return { 
        success: false, 
        error: existingUser.email === email 
          ? 'Email already registered' 
          : 'Username already taken' 
      };
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email,
      username,
      password, // In real app, this would be hashed on backend
      fullName: username, // Default full name to username
    };

    storedUsers.push(newUser);
    localStorage.setItem('stathub_users', JSON.stringify(storedUsers));

    // Auto-login after signup
    const userSession = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
      fullName: newUser.fullName,
    };
    setUser(userSession);
    localStorage.setItem('stathub_user', JSON.stringify(userSession));

    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('stathub_user');
  };

  const resetPassword = async (email: string) => {
    // Simulate sending reset email
    const storedUsers = JSON.parse(localStorage.getItem('stathub_users') || '[]');
    const userExists = storedUsers.some((u: any) => u.email === email);

    if (userExists) {
      return { success: true };
    }

    return { success: false, error: 'Email not found' };
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    if (!user) return { success: false, error: 'Not authenticated' };

    const storedUsers = JSON.parse(localStorage.getItem('stathub_users') || '[]');
    const userIndex = storedUsers.findIndex((u: any) => u.id === user.id);

    if (userIndex === -1) {
      return { success: false, error: 'User not found' };
    }

    if (storedUsers[userIndex].password !== currentPassword) {
      return { success: false, error: 'Current password is incorrect' };
    }

    storedUsers[userIndex].password = newPassword;
    localStorage.setItem('stathub_users', JSON.stringify(storedUsers));

    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        resetPassword,
        changePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
