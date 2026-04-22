import { push, set, ref, get, type Database } from "firebase/database";

export const SaveUser = (
  db: Database,
  userData: { name: string; email: string },
) => {
  const newUser = push(ref(db, "users"));

  return set(newUser, userData);
};

export const GetUsers = async (db: Database) => {
  const dataRef = ref(db, "users");
  const snapshot = await get(dataRef);

  return snapshot;
};
