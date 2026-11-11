import { useMemo, useState } from "react";
import AuthContext from "./authContext";

function AuthProvider({ children }) {
  const [accounts, setAccounts] = useState([]);
  const [user, setUser] = useState(null);

  const value = useMemo(
    () => ({
      user,
      login(email, password) {
        const account = accounts.find(
          (entry) => entry.email.toLowerCase() === email.trim().toLowerCase(),
        );

        if (!account || account.password !== password) {
          throw new Error("Email or password is incorrect.");
        }

        setUser({ name: account.name, email: account.email });
      },
      signup(name, email, password) {
        const normalizedEmail = email.trim().toLowerCase();
        if (accounts.some((entry) => entry.email === normalizedEmail)) {
          throw new Error("An account with this email already exists.");
        }

        const account = { name: name.trim(), email: normalizedEmail, password };
        setAccounts((currentAccounts) => [...currentAccounts, account]);
        setUser({ name: account.name, email: account.email });
      },
      logout() {
        setUser(null);
      },
    }),
    [accounts, user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
