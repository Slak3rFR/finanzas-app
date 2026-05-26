import {
  collection,
  addDoc,
  getDocs,
} from 'firebase/firestore'

import {
  db,
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

    return snapshot.docs.map(
      (doc) => ({

        id: doc.id,
        ...doc.data(),

      })
    )

  }