import { createContext, useState } from "react";

type User = {
  name: string;
  role: string;
};

type Auth = {
  user: User | null;
  login: (username: string, password: string) => void;
  logOut: () => void;
};

export const AuthContext = createContext<Auth | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (username: string, password: string) => {
    try {
      fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })
        .then((response) => response.json())
        .then((data: User) => {
          setUser(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
