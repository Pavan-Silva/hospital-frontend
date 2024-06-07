import { createContext, useState } from "react";

type User = {
  username: string;
  role: string;
};

type Auth = {
  user: User | null;
  login: (username: string, password: string) => void;
  logOut: () => void;
};

export const AuthContext = createContext<Auth>({} as Auth);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(
    sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user")!)
      : null
  );

  const login = (username: string, password: string) => {
    try {
      fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
        credentials: "include",
      })
        .then((response) => response.json())
        .then((data: User) => {
          sessionStorage.setItem("user", JSON.stringify(data));
          setUser(data);
          window.location.replace("/");
        });
    } catch (error) {
      console.log(error);
    }
  };

  const logOut = () => {
    sessionStorage.removeItem("user");
    setUser(null);
    window.location.replace("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
