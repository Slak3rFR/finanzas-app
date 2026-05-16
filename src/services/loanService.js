import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore'

import {
  db,
  auth,
} from '../firebase/config'

const loansRef =
  collection(db, 'loans')

export const addLoan =
  async (loan) => {

    return await addDoc(
      loansRef,
      {
        ...loan,
        uid:
          auth.currentUser.uid,
      }
    )

  }

export const getLoans =
  async () => {

    const snapshot =
      await getDocs(loansRef)

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

export const deleteLoan =
  async (id) => {

    const loanDoc =
      doc(db, 'loans', id)

    await deleteDoc(loanDoc)

  }