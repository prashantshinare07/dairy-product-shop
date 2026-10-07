import {
    collection,
    getDocs,
    type DocumentData,
  } from 'firebase/firestore'
  import { db } from '../firebase'
  import type { Product, ProductId } from '../types/product'
  
  const productsCollection = collection(db, 'products')
  
  export const getProducts = async (): Promise<Product[]> => {
    const snapshot = await getDocs(productsCollection)
  
    return snapshot.docs.map(doc => {
      const data = doc.data() as DocumentData
  
      return {
        id: doc.id as ProductId,
        name: data.name as string,
        price: data.price as number,
      }
    })
  }