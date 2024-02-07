import React, { useState, useEffect } from "react";
// import { getAuth, listUsers } from "firebase/auth";
import { auth, db } from "../main";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  doc,
  where,
  query,
} from "firebase/firestore";

export default function Users() {
  const collectionRef = collection(db, "usersDetails");

  const [userList, setUserList] = useState([]);
  const listAllUsers = async () => {
    try {
      const users = await getDocs(collectionRef);
      // const usersListIs = users.users.map((user) => ({
      //   uid: user.uid,
      //   email: user.email, // Adjust data as needed
      //   // ...other relevant user data
      // }));
      let data = "users.docs[0]._document.data.value.mapValue.fields";
      console.log(
        "usersListIs=>>>>> ",
        users.docs[0]._document.data.value.mapValue.fields
      );
      console.log("users=>>>>> ", users);
      setUserList(users.docs);
    } catch (error) {
      console.error("Error listing users:", error);
      return [];
    }
  };

  //update data

  const handleUpdate = async (e , email) => {
    // ... validate updatedData using validateUpdateData if applicable
    alert(email)
    // const userRef = doc(collectionRef, "email" == email);
    const q = query(collectionRef, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    const userDoc = querySnapshot.docs[0]; // Assuming a single matching document
    const userRef = doc(db, 'usersDetails', userDoc.id);
    const value = e.target.value;
    try {
      await updateDoc(userRef, { active: value==="true"?true : false });
      console.log('Document updated successfully!');
      // Optionally, update the local state to reflect the change:
      setIsActive(!isActive); // Toggle the state
      setSelectedValue(isActive ? 'Active' : 'Not Active');
    } catch (error) {
      console.error('Error updating document:', error);
      // Handle errors gracefully, e.g., display an error message to the user
    }
  };

  useEffect(() => {
    listAllUsers();
  }, []);

  return (
    <>
      {userList.length && (
        <div
          style={{ borderRadius: "0px" }}
          className="relative overflow-x-auto shadow-md sm:rounded-lg "
        >
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">Name</div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    Category
                    <a href="#">
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    Price
                    <a href="#">
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                      </svg>
                    </a>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {userList.map((doc, i) => {
                return (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={i}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {
                        doc._document.data.value.mapValue.fields.email
                          .stringValue
                      }
                    </th>
                    <td className="px-6 py-4">
                      {" "}
                      {
                        doc._document.data.value.mapValue.fields.name
                          .stringValue
                      }{" "}
                    </td>
                    <td className="px-6 py-4">
                      {" "}
                      {
                        doc._document.data.value.mapValue.fields.id.stringValue
                      }{" "}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        id="countries"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        // defaultValue={doc._document.data.value.mapValue.fields.active.booleanValue ? "Active" : "Not Active"}
                        onChange={(e)=>{handleUpdate(e ,doc._document.data.value.mapValue.fields.email.stringValue )}}
                      >
                        <option
                          value="true"
                        >
                          {doc._document.data.value.mapValue.fields.active
                            .booleanValue ? "Active" : "Not Active"}
                        </option>
                        <option
                          value="false"
                        >
                          {doc._document.data.value.mapValue.fields.active
                            .booleanValue ? "Not Active" :"Active"}
                        </option>
                      </select>{" "}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
