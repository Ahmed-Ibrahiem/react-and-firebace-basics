import { push, set, ref, type Database } from "firebase/database";

export const SaveUser = (
  db: Database,
  userData: { name: string; email: string },
) => {
  const newUser = push(ref(db, "users"));

  return set(newUser, userData);
};
