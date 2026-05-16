import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore'

import { db } from '../firebase/config'

const installmentsRef = collection(
  db,
  'installments'
)

export const addInstallment = async (
  installment
) => {

  return await addDoc(
    installmentsRef,
    installment
  )

}

export const getInstallments =
  async () => {

    const q = query(
      installmentsRef,
      orderBy('createdAt', 'desc')
    )

    const snapshot = await getDocs(q)

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

  }

export const deleteInstallment =
  async (id) => {

    const installmentDoc = doc(
      db,
      'installments',
      id
    )

    await deleteDoc(installmentDoc)

  }

export const updateInstallment =
  async (id, data) => {

    const installmentDoc = doc(
      db,
      'installments',
      id
    )

    await updateDoc(
      installmentDoc,
      data
    )

  }