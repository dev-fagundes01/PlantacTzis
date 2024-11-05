import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../../config/firebaseConfig'
import OpenEye from '../assets/eye.png'
import CloseEye from '../assets/eye_121.png'
// import Google from '../assets/google-icon.png'
import Loading from '../assets/loading.gif'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(false)

  const navigate = useNavigate()

  const [accountDetails, setAccountDetails] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setAccountDetails(prev => ({ ...prev, [name]: value }))
  }

  const addAccount = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (accountDetails.password === accountDetails.confirmPassword) {
      setError('As senhas não conferem')
      setLoading(false)
      return
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, accountDetails.email, accountDetails.password)

      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: accountDetails.name,
        email: accountDetails.email,
        role: 'user',
        createAt: new Date()
      })

      setSuccess("Cadastrado com sucesso")

      setAccountDetails({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      })
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
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
      setLoading(false)
    } catch (error) {
      setLoading(false)
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
    <div className="h-screen flex-utilities flex-col">
      {isLogin ?
        <div className='p-6 rounded-lg bg-secondaryBackground'>
          <form className="div-c w-min flex flex-col items-center relative" onSubmit={handleLogin}>
            <h1 className='w-48 text-xs text-secondaryForeground text-center font-semibold md:w-28. md:text-3xl'>Insira seus dados para entrar</h1>
            <h3 className='h3-c mt-2 text-secondaryForeground justify-center'>Escolha uma opção</h3>

            <div className="flex flex-col">
              <label className='label-c' htmlFor="email">E-mail:</label>
              <input className='input-c' placeholder="exemplo@email.com" autoComplete='true' type="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            {loading && <img className='h-20 w-20 absolute top-[8.2rem]' src={Loading} alt="Imagem de carregamento" />}

            <div className="flex flex-col relative" id="password">
              <label className='label-c' htmlFor="password">Senha:</label>
              <input className='input-c' placeholder="fs12345" type={isPasswordVisible ? "string" : "password"} name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              <button type="button" onKeyUp={keyUp} onKeyDown={(e) => e.preventDefault()} onClick={togglePasswordVisibility}>
                <img className='h-8 absolute right-[0.5rem] bottom-[-1px] cursor-pointer' src={isPasswordVisible ? OpenEye : CloseEye} alt="Imagem para mudar visibilidade  da senha" />
              </button>
            </div>

            <button className="btn-primary mt-6 text-lg" type="submit">Entrar</button>
          </form>

          <div className='flex-utilities gap-1'>
            <p className='p-c text-secondaryForeground'>Quer Adicionar mais uma Conta?</p>
            <button className="btn-primary md:w-40 mx-0 mt-0 text-lg" onClick={() => setIsLogin(false)}>Adicionar Conta</button>
          </div>

          {/* <p className="p-c my-4 text-secondaryForeground">Ou entre com</p> */}
          {/* <img className='rounded-full' src={Google} alt="Autenticação pelo Google" /> */}
          {error && <p className='p-c my-4 text-destructiveForeground text-center'>{error}</p>}
        </div>
        :
        <div className='p-6 rounded-lg bg-secondaryBackground'>
          <form className="div-c w-min flex flex-col items-center relative" onSubmit={addAccount}>
            <h1 className='w-48 text-xs text-secondaryForeground text-center font-semibold md:w-28. md:text-3xl'>Cadastre seus Produtos com Segurança</h1>

            <div className="flex flex-col">
              <label className='label-c' htmlFor="email">Nome</label>
              <input className='input-c' placeholder="Maria..." autoComplete='true' type="text" name="name" required value={accountDetails.name} onChange={handleChange} />
            </div>

            <div className="flex flex-col">
              <label className='label-c' htmlFor="email">E-mail:</label>
              <input className='input-c' placeholder="exemplo@email.com" autoComplete='true' type="email" name="email" required value={accountDetails.email} onChange={handleChange} />
            </div>

            {loading && <img className='h-20 w-20 absolute top-[8.2rem]' src={Loading} alt="Imagem de carregamento" />}

            <div className="flex flex-col relative" id="password">
              <label className='label-c' htmlFor="password">Senha:</label>
              <input className='input-c' placeholder="fs12345" type={isPasswordVisible ? "string" : "password"} name="password" required minLength={6} value={accountDetails.password} onChange={handleChange} />
              <button type="button" onKeyUp={keyUp} onKeyDown={(e) => e.preventDefault()} onClick={togglePasswordVisibility}>
                <img className='h-8 absolute right-[0.5rem] bottom-[-1px] cursor-pointer' src={isPasswordVisible ? OpenEye : CloseEye} alt="Imagem para mudar visibilidade  da senha" />
              </button>
            </div>

            <div className="flex flex-col relative" id="password">
              <label className='label-c' htmlFor="password">Senha:</label>
              <input className='input-c' placeholder="fs12345" type={isPasswordVisible ? "string" : "password"} name="password" required minLength={6} value={accountDetails.confirmPassword} onChange={handleChange} />
              <button type="button" onKeyUp={keyUp} onKeyDown={(e) => e.preventDefault()} onClick={togglePasswordVisibility}>
                <img className='h-8 absolute right-[0.5rem] bottom-[-1px] cursor-pointer' src={isPasswordVisible ? OpenEye : CloseEye} alt="Imagem para mudar visibilidade  da senha" />
              </button>
            </div>

            <button className={`btn-primary mt-6 text-lg ${loading} ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'`} type="submit" disabled={loading}>{loading ? 'Adicionando...' : 'Adicionar Conta'}</button>
          </form>

          <div className='flex-utilities gap-1'>
            <p className='p-c text-secondaryForeground'>Já possui uma conta?</p>
            <button className="btn-primary md:w-40 mx-0 mt-0 text-lg" onClick={() => setIsLogin(true)}>Acesse a sua conta</button>
          </div>

          {/* <p className="p-c my-4 text-secondaryForeground">Ou entre com</p> */}
          {/* <img className='rounded-full' src={Google} alt="Autenticação pelo Google" /> */}
          {error && <p className='p-c my-4 text-destructiveForeground text-center'>{error}</p>}
          {success && <p className='p-c my-4 text-destructiveForeground text-center'>{success}</p>}
        </div>
      }
    </div>
  )
}
