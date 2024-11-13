import { collection, onSnapshot } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../../config/firebaseConfig";

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [plants, setPlants] = useState([]);
  const [vases, setVases] = useState([]);
  const [other, setOther] = useState([]);

  useEffect(() => {
    const plantsCollectionRef = collection(db, "plants");
    const vasesCollectionRef = collection(db, "vases");
    const otherCollectionRef = collection(db, "other_products");

    const plantListenerCleanup = onSnapshot(plantsCollectionRef, (snapshot) => {
      setPlants(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    })

    const vaseListenerCleanup = onSnapshot(vasesCollectionRef, (snapshot) => {
      setVases(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })

    const otherProductsListenerCleanup = onSnapshot(otherCollectionRef, (snapshot) => {
      setOther(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })

    return () => {
      plantListenerCleanup();
      vaseListenerCleanup();
      otherProductsListenerCleanup();
    }
  }, [])

  const value = {
    plants,
    vases,
    other,
    setPlants,
    setVases,
    setOther
  }

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  )
}

export function useProduct() {
  return useContext(ProductContext)
}
