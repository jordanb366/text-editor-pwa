import { openDB } from "idb";
// Imports idb for use
// Created database
const initdb = async () =>
  openDB("jate", 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains("jate")) {
        console.log("jate database already exists");
        return;
      }
      db.createObjectStore("jate", { keyPath: "id", autoIncrement: true });
      console.log("jate database created");
    },
  });

// Completed: Add logic to a method that accepts some content and adds it to the database
// PutDb route, puts content into data base
export const putDb = async (content) => {
  // PUT request to database
  console.log("PUT to the database");
  // Create a new transaction and specify the database and data privileges.
  const jateDb = await openDB("jate", 1);
  // Open up the desired object store (with read and write access).
  const tx = jateDb.transaction("jate", "readwrite");
  // Opens up the desired object store
  const store = tx.objectStore("jate");
  // Use the .put method to store and update data to the database
  const request = store.put({ id: 1, value: content });
  // Gets confirmation of the request
  const result = await request;
  console.log("🚀 - data saved to the database", result);
};

// Compeleted: Add logic for a method that gets all the content from the database
// GetDb from data base
export const getDb = async () => {
  console.log("GET all from the database");
  // Create a connection to the database database and version we want to use (1 in this case).
  const jateDb = await openDB("jate", 1);
  // Create a new transaction and specify the database and data privileges (read only in this case).
  const tx = jateDb.transaction("jate", "readonly");
  // Opens up the desired object store
  const store = tx.objectStore("jate");
  // Use the .get method to get data from the database
  const request = store.get(1);
  // Gets confirmation of the request and returns the results value
  const result = await request;
  console.log("result.value", result);
  // returns the value if result has data in the database
  return result?.value;
};

initdb();
