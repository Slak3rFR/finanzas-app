import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'

import {
  db,
  auth,
} from '../firebase/config'

const installmentsRef =
  collection(
    db,
    'installments'
  )

export const addInstallment =
  async (installment) => {

    if (!auth.currentUser)
      return

    return await addDoc(
      installmentsRef,
      {

        ...installment,

        uid:
          auth.currentUser.uid,

        createdAt:
          Date.now(),

        currentInstallment: 1,

      }
    )

  }

export const getInstallments =
  async () => {

    if (!auth.currentUser)
      return []

    const q = query(

      installmentsRef,

      where(
        'uid',
        '==',
        auth.currentUser.uid
      ),

      orderBy(
        'createdAt',
        'desc'
      )

    )

    const snapshot =
      await getDocs(q)

    return snapshot.docs.map(
      (doc) => ({

        id: doc.id,
        ...doc.data(),

      })
    )

  }

export const deleteInstallment =
  async (id) => {

    const installmentDoc =
      doc(
        db,
        'installments',
        id
      )

    await deleteDoc(
      installmentDoc
    )

  }

export const updateInstallment =
  async (id, data) => {

    const installmentDoc =
      doc(
        db,
        'installments',
        id
      )

    await updateDoc(
      installmentDoc,
      data
    )

  }