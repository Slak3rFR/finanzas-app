import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore'

import { db } from '../firebase/config'

const financesRef =
  collection(
    db,
    'finances'
  )

// OBTENER

export const getFinances =
  async () => {

    const snapshot =
      await getDocs(
        financesRef
      )

    return snapshot.docs.map(
      (docItem) => ({

        id: docItem.id,

        ...docItem.data(),

      })
    )

  }

// AGREGAR

export const addFinance =
  async (finance) => {

    await addDoc(
      financesRef,
      finance
    )

  }

// ELIMINAR

export const deleteFinance =
  async (id) => {

    const financeDoc =
      doc(
        db,
        'finances',
        id
      )

    await deleteDoc(
      financeDoc
    )

  }

// EDITAR

export const updateFinance =
  async (
    id,
    data
  ) => {

    const financeDoc =
      doc(
        db,
        'finances',
        id
      )

    await updateDoc(
      financeDoc,
      data
    )

  }