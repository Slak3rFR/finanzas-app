import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from 'firebase/firestore'

import { db } from '../firebase/config'

const fixedExpensesRef = collection(
  db,
  'fixedExpenses'
)

export const addFixedExpense =
  async (expense) => {

    return await addDoc(
      fixedExpensesRef,
      expense
    )

  }

export const getFixedExpenses =
  async () => {

    const q = query(
      fixedExpensesRef,
      orderBy('createdAt', 'desc')
    )

    const snapshot = await getDocs(q)

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

  }

export const deleteFixedExpense =
  async (id) => {

    const expenseDoc = doc(
      db,
      'fixedExpenses',
      id
    )

    await deleteDoc(expenseDoc)

  }