import { push, set, ref, get, type Database } from "firebase/database";

export const SaveUser = (
  db: Database,
  userData: { name: string; email: string },
) => {
  const newUser = push(ref(db, "users"));

  return set(newUser, userData);
};

export const updateUser = (
  db: Database,
  userData: { name: string; email: string },
  id: string,
) => {
  return set(ref(db, "users/" + id), userData);
};

export const GetUsers = async (db: Database) => {
  const dataRef = ref(db, "users");
  const snapshot = await get(dataRef);

  return snapshot;
};

export const GetUser = async (db: Database, id: string) => {
  const dataRef = ref(db, "users/" + id);
  const snapshot = await get(dataRef);

  return snapshot;
};

type user = {
  name: string;
  email: string;
  userId?: string;
};

export const updatingReadingData = async (db: Database) => {
  const dbRef = ref(db, "users");

  try {
    const snapshot = await get(dbRef);
    const usersData = snapshot.val();
    if (!usersData) return [];

    const tempororyArray: user[] = Object.keys(usersData).map((id) => {
      return {
        ...usersData[id],
        userId: id,
      };
    });

    return tempororyArray;
  } catch {
    throw Error("Something went wrong");
  }
};
