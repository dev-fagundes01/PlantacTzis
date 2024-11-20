import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom';
import { auth, db } from '../../config/firebaseConfig';
import Loading from '../assets/loading.gif'

export default function ProtectedRoute({ children }) {
  const [authState, setAuthState] = useState({ isLoading: true, isAdmin: false, isAuthenticated: false });


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          return setAuthState({
            isLoading: false,
            isAdmin: userDoc.exists() && userDoc.data().isAdmin,
            isAuthenticated: true
          });
        } catch (error) {
          console.error('Erro ao buscar o documento do  usuário:', error);
          setAuthState({ isLoading: false, isAdmin: false, isAuthenticated: false });
        }
      }

      setAuthState({ isLoading: false, isAdmin: false, isAuthenticated: false });

    })

    return () => unsubscribe()
  }, [])

  if (authState.isLoading) return <div className='h-screen flex items-center justify-center'><img className='h-40' src={Loading} alt="Imagem de carregamento" /></div>

  if (!authState.isAuthenticated || !authState.isAdmin) return <Navigate to="/" replace={true} />;

  return children
}
