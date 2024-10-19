import { signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../../config/firebaseConfig'
import OpenEye from '../assets/eye.png'
import CloseEye from '../assets/eye_121.png'
import Google from '../assets/google-icon.png'
import Loading from '../assets/loading.gif'

export default function Login({ showLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const useCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = useCredential.user

      const userDoc = await getDoc(doc(db, "users", user.uid))

      if (userDoc.exists() && userDoc.data().isAdmin) {
        console.log('Admin logged in')
        navigate('/cadastrar-produtos')
      } else {
        setError("Acesso não autorizado")
      }
      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setError("Email ou senha incorretos")
      console.log("Erro no login", error);
    }
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const keyUp = () => {
    togglePasswordVisibility()
  }

  return (
    <div className="h-screen flex-utilities">
      <form className="div-c w-min p-6 bg-secondaryBackground flex flex-col items-center relative" onSubmit={handleLogin}>

        <h1 className='w-48 text-xs text-secondaryForeground text-center font-semibold md:w-28. md:text-3xl'>Entre e cadastre seus Produtos com Segurança</h1>
        <h3 className='h3-c mt-2 text-secondaryForeground justify-center'>Escolha uma opção</h3>

        <div className="flex flex-col">
          <label className='label-c' htmlFor="email">E-mail:</label>
          <input className='input-c' placeholder="exemplo@email.com" autoComplete='true' type="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        {isLoading && <img className='h-20 w-20 absolute top-[8.2rem]' src={Loading} alt="Imagem de carregamento" />}

        <div className="flex flex-col relative" id="password">
          <label className='label-c' htmlFor="password">Senha:</label>
          <input className='input-c' placeholder="12345" type={isPasswordVisible ? "string" : "password"} name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="button" onKeyUp={keyUp} onKeyDown={(e) => e.preventDefault()} onClick={togglePasswordVisibility}>
            <img className='h-8 absolute right-[0.5rem] bottom-[-1px] cursor-pointer' src={isPasswordVisible ? OpenEye : CloseEye} alt="Imagem para mudar visibilidade  da senha" />
          </button>
        </div>

        <button className="btn-primary mt-6 text-lg" type="submit">Entrar</button>
        <p className="p-c my-4 text-secondaryForeground">Ou entre com</p>
        <img className='rounded-full' src={Google} alt="Autenticação pelo Google" />
      </form>
      {error && <p className="p-c my-4 text-red-500">{error}</p>}
    </div>
  )
}
