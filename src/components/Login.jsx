import React, { useState, useEffect, useContext } from 'react';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../main';
import { UserContext } from './context/ContextProvider';
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { query, where, getDocs } from 'firebase/firestore';

const Login = () => {
const {user, setUser} = useContext(UserContext)
// const collectionRef = db.collection("usersDetails");
const collectionRef = collection(db, 'usersDetails');
const [addUser , setAddUser] = useState(false)

const fetchUser = async (email) => {
  try {
    const q = query(collectionRef, where('email', '==', email));

    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log('No document found.');
      // setAddUser(true)
      return {"true":true};
    }
    else{
      return {"false":false};
    }

    // querySnapshot.forEach((doc) => {
    //   const user = doc.data();
    //   console.log('Found user:', user);
    //   // Process or return the user data as needed
    // });
  } catch (error) {
    console.error('Error fetching documents:', error);
  }
};


const addUserDetails = async (user)=> {

 const isAlreadyAva=  await fetchUser(user.email)
//  alert(isAlreadyAva)
if(isAlreadyAva.true){
   const newData = {
    active: true,
    email: user.email,
    id:user.email,
    name: user.displayName,
    
  };
  const users = await addDoc(collectionRef , newData)
  .then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
    console.log("Document written with users: ", users);
  })
  .catch((error) => {
    console.error("Error adding document: ", error);
  });

}
else{
  alert("data not added")
}
 
}
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      addUserDetails(result.user)
    } catch (error) {
      console.error(error);
      // Handle errors accordingly
    }
  };
//   useEffect(() => {
//     if (db) {
//         // Access db.collection safely here
//         console.log("db=>>>> ", db.collection("usersDetails"));
//       } else {
//         console.error("Firestore not initialized yet.");
//     }
// }, [db]);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
        setUser(user); // Update user state
    });
  
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? (
        <p>Logged in as {user.email}</p>
      ) : (
        <button onClick={handleGoogleSignIn}>Sign in with Google</button>
      )}
    </div>
  );
};

export default Login;
