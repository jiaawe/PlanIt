import { ref, watchEffect } from "vue";
import { db } from "../firebase/firebase";

const getCollection = (
  collection,
  query,
  query2 = null,
  orderBy = null,
  limit = null,
  desc = "asc",
  query3 = null
) => {
  const documents = ref(null);
  const error = ref(null);

  // register the firestore collection reference
  let collectionRef = db.collection(collection);

  if (query3) {
    collectionRef = collectionRef
      .where(...query)
      .where(...query2)
      .where(...query3);
  } else if (query2) {
    collectionRef = collectionRef.where(...query).where(...query2);
  } else if (query) {
    collectionRef = collectionRef.where(...query);
  }

  if (orderBy) {
    collectionRef = collectionRef.orderBy(orderBy, desc);
  }
  if (limit) {
    collectionRef = collectionRef.limit(limit);
  }
  const unsub = collectionRef.onSnapshot(
    (snap) => {
      let results = [];
      snap.docs.forEach((doc) => {
        // must wait for the server to create the timestamp & send it back
        doc.data().openedTimestamp &&
          results.push({ ...doc.data(), id: doc.id });
      });

      // update values
      documents.value = results;
      error.value = null;
    },
    (err) => {
      console.log(err.message);
      documents.value = null;
      error.value = "could not fetch the data";
    }
  );

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { error, documents };
};

export default getCollection;
