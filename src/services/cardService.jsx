import {
  collection,
  addDoc,
  getDocs,
} from 'firebase/firestore'

import {
  db,
  auth,
} from '../firebase/config'

const cardsRef =
  collection(db, 'cards')

export const addCard =
  async (card) => {

    return await addDoc(
      cardsRef,
      card
    )

  }

export const getCards =
  async () => {

    const snapshot =
      await getDocs(cardsRef)

    return snapshot.docs
      .filter(
        (doc) =>
          doc.data().uid ===
          auth.currentUser.uid
      )
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))

  }