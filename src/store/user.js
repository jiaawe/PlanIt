import { defineStore } from "pinia";
import { db } from "../firebase/firebase";

export const useUserStore = defineStore("user", {
  state: () => ({
    id: "",
    name: "",
    email: "",
    role: "",
    contactNumber: "",
    department: "",
    imageURL: "",
  }),

  actions: {
    setUser(user) {
      this.currentUser = user;
      this.getUserData(user.email);
    },

    // Add clearUser action
    clearUser() {
      this.currentUser = null;
      this.id = "";
      this.name = "";
      this.email = "";
      this.role = "";
      this.contactNumber = "";
      this.department = "";
      this.imageURL = "";
    },
    async getUserData(email) {
      try {
        let collectionRef = db.collection("Users");
        let query = ["email", "==", email];

        collectionRef
          .where(...query)
          .get()
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              if (doc.data().email == email) {
                // Store user data in local storage
                localStorage.setItem(
                  "user",
                  JSON.stringify({ ...doc.data(), id: doc.id })
                );
                console.log("sucesful local storage");
                this.id = doc.id;
                // Set user data in store
                this.name = doc.data().name;
                this.email = doc.data().email;
                this.role = doc.data().role;
                this.contactNumber = doc.data().contactNumber;
                this.department = doc.data().department;
                this.imageURL = doc.data().imageURL;
              }
            });
          })
          .catch((error) => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      }
    },

    // Set user data
    setUserData() {
      let userData = JSON.parse(localStorage.getItem("user"));
      this.id = userData.id;
      this.name = userData.name;
      this.email = userData.email;
      this.role = userData.role;
      this.contactNumber = userData.contactNumber;
      this.department = userData.department;
      this.imageURL = userData.imageURL;
    },

    // Update user data based on updated data
    async updateUserData(updatedData) {
      try {
        let collectionRef = db.collection("Users");
        let query = ["email", "==", updatedData.email];

        const snapshot = await collectionRef.where(...query).get();
        if (snapshot.empty) {
          console.error(
            "No matching documents found for email:",
            updatedData.email
          );
          return;
        }

        const doc = snapshot.docs[0];
        const docRef = doc.ref;
        await docRef.update({
          name: updatedData.name,
          email: updatedData.email,
          role: updatedData.role,
          contactNumber: updatedData.contactNumber,
          department: updatedData.department,
          imageURL: updatedData.imageURL,
        });

        this.name = updatedData.name;
        this.email = updatedData.email;
        this.role = updatedData.role;
        this.contactNumber = updatedData.contactNumber;
        this.department = updatedData.department;
        this.imageURL = updatedData.imageURL;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
