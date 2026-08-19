import { createContext, useState } from "react";

export const userCtx = createContext({
  userID: undefined,
  setUserID: () => { },
});

export function UserContextProvider({ children }) {
  const [userID, setUserID] = useState(id);

  return (
    <userCtx.Provider value={{ user, setUserID }}>{children}</userCtx.Provider>
  );
}
