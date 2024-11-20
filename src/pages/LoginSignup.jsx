import { createUserWithEmailAndPassword, fetchSignInMethodsForEmail, GoogleAuthProvider, linkWithCredential, signInWithCredential, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../../config/firebaseConfig'
import OpenEye from '../assets/eye.png'
import CloseEye from '../assets/eye_121.png'
import Google from '../assets/google-icon.png'
import Loading from '../assets/loading.gif'
import Title from '../components/Title'

const provider = new GoogleAuthProvider();

export default function LoginSignup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false)
  const [isLogin, setIsLogin] = useState(true)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const navigate = useNavigate()

  const [accountDetails, setAccountDetails] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [authState, setAuthState] = useState({
    isLoading: true,
    isAdmin: false,
    isAuthenticated: false
  })

  useEffect(() => {
    if (authState.isAuthenticated && authState.isAdmin) {
      navigate("/cadastrar-produtos");
    }
  }, [authState]);

  const handleChange = (e) => {
    const { name, value } = e.target
    setAccountDetails(prev => ({ ...prev, [name]: value }))
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const keyUp = () => {
    togglePasswordVisibility()
  }

  const addAccount = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (accountDetails.password !== accountDetails.confirmPassword) {
      setError("As senhas não conferem");
      setLoading(false);
      return;
    }

    try {
      const methods = await fetchSignInMethodsForEmail(auth, accountDetails.email);

      if (methods.length > 0) {
        setError(
          "Este e-mail já está associado a outro provedor. Use outra forma de login."
        );
        setLoading(false);
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        accountDetails.email,
        accountDetails.password
      );

      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: accountDetails.name,
        email: accountDetails.email,
        isAdmin: true,
        createAt: new Date(),
      });

      setSuccess("Cadastrado com sucesso");

      setAccountDetails({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.log(error.message);
      setError("Erro: e-mail de autenticação já em uso");
    } finally {
      setLoading(false);
    }
  };

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

  const signInGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const methods = await fetchSignInMethodsForEmail(auth, user.email);
      console.log(methods);

      if (methods.length > 0 && !methods.includes("google.com")) {
        console.error("Account already linked to another provider");

        const email = user.email;
        const pendingCredential = GoogleAuthProvider.credentialFromResult(result);

        try {
          if (methods.includes("password")) {
            const password = prompt(
              "Sua conta já está associada a uma senha. Digite sua senha para vincular a conta:"
            );

            const credential = EmailAuthProvider.credential(email, password);
            const userCredential = await signInWithCredential(auth, credential);

            await linkWithCredential(userCredential.user, pendingCredential);
            console.log("Account linked successfully!");
          } else {
            alert('Outro método de autenticação detectado, mas não suportado.');
            return
          }
        } catch (linkError) {
          console.error("Error linking account:", linkError);
          return;
        }
      }

      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (!userDoc.exists()) {
        await setDoc(userDocRef, {
          name: user.displayName,
          email: user.email,
          isAdmin: true,
          createAt: new Date(),
        });
      }

      setAuthState({
        isLoading: false,
        isAdmin: userDoc.exists() && userDoc.data().isAdmin,
        isAuthenticated: true,
      });

      if (authState.isAuthenticated && authState.isAdmin) {
        navigate("/cadastrar-produtos");
      }
    } catch (error) {
      if (error.code === "auth/account-exists-with-different-credential") {
        console.error("Linked account error detected:", error);
      }
      console.error("Error logging in with Google:", error);
    }
  };

  return (
    <div className="h-screen flex-utilities">
      {isLogin ?
        <div className='p-6 rounded-lg bg-secondaryBackground'>
          <Title>Insira seus dados para entrar</Title>
          <h3 className='h3-c mt-2 justify-center dm:text-sm text-secondaryForeground'>Escolha uma opção</h3>

          <form className="div-c w-min flex flex-col items-center relative" onSubmit={handleLogin}>
            <div className="flex flex-col">
              <label className='label-c' htmlFor="email">E-mail:</label>
              <input className='input-c' placeholder="exemplo@email.com" autoComplete='true' type="email" name="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            {loading && <img className='h-20 w-20 absolute top-[8.2rem]' src={Loading} alt="Imagem de carregamento" />}

            <div className="flex flex-col" id="password">
              <label className='label-c' htmlFor="password">Senha:</label>
              <div className='flex relative'>
                <input className='input-c' placeholder="fs12345" type={isPasswordVisible ? "string" : "password"} name="password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                <button className='absolute right-[0.1rem]' type="button" onKeyUp={keyUp} onKeyDown={(e) => e.preventDefault()} onClick={togglePasswordVisibility}>
                  <img className='h-6 md:h-8' src={isPasswordVisible ? OpenEye : CloseEye} alt="Imagem para mudar visibilidade  da senha" />
                </button>
              </div>
            </div>

            <button className="btn-primary text-xs md:mt-6 md:text-lg" type="submit">Entrar</button>
          </form>

          <div className='flex-utilities gap-1'>
            <p className='p-c dm:text-semiBase text-secondaryForeground'>Quer Adicionar mais uma Conta?</p>
            <button className="btn-primary mx-0 mt-0 text-xs md:w-40 md:text-lg" onClick={() => setIsLogin(false)}>Adicionar</button>
          </div>

          {error && <p className='p-c my-4 text-destructiveForeground text-center'>{error}</p>}
          <div className='flex flex-col items-center'>
            <p className="p-c my-4 text-secondaryForeground">Ou entre com</p>
            <img className='rounded-full cursor-pointer' src={Google} alt="Autenticação pelo Google" onClick={signInGoogle} />
          </div>
        </div>
        :
        <div className='p-6 rounded-lg bg-secondaryBackground'>
          <Title className='text-[.95rem]'>Cadastre seus Produtos com Segurança</Title>

          <form className="div-c w-min flex flex-col items-center relative" onSubmit={addAccount}>
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
              <div className='flex relative'>
                <input className='input-c' placeholder="fs12345" type={isPasswordVisible ? "string" : "password"} name="password" required minLength={6} value={accountDetails.password} onChange={handleChange} />
                <button className='absolute right-[0.1rem]' type="button" onKeyUp={keyUp} onKeyDown={(e) => e.preventDefault()} onClick={togglePasswordVisibility}>
                  <img className='h-6 md:h-8' src={isPasswordVisible ? OpenEye : CloseEye} alt="Imagem para mudar visibilidade  da senha" />
                </button>
              </div>
            </div>

            <div className="flex flex-col relative" id="password">
              <label className='label-c' htmlFor="confirmPassword">Confirme sua Senha:</label>
              <div className='flex relative'>
                <input className='input-c' placeholder="fs12345" type={isPasswordVisible ? "string" : "password"} name="confirmPassword" required minLength={6} value={accountDetails.confirmPassword} onChange={handleChange} />
                <button className='absolute right-[0.1rem]' type="button" onKeyUp={keyUp} onKeyDown={(e) => e.preventDefault()} onClick={togglePasswordVisibility}>
                  <img className='h-6 md:h-8' src={isPasswordVisible ? OpenEye : CloseEye} alt="Imagem para mudar visibilidade  da senha" />
                </button>
              </div>
            </div>

            <button className={`btn-primary dm:py-0 text-semiBase md:mt-6 md:text-lg ${loading} ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'`} type="submit" disabled={loading}>{loading ? 'Adicionando...' : 'Adicionar Conta'}</button>
          </form>

          <div className='flex-utilities gap-1'>
            <p className='p-c dm:text-xs text-secondaryForeground'>Já possui uma conta?</p>
            <button className="btn-primary mx-0 mt-0 text-semiBase dm:py-0 md:w-40 md:text-lg" onClick={() => setIsLogin(true)}>Acesse a sua conta</button>
          </div>

          {/* <p className="p-c my-4 text-secondaryForeground">Ou entre com</p> */}
          {/* <img className='rounded-full' src={Google} alt="Autenticação pelo Google" /> */}
          {error && <p className='p-c my-4 text-destructiveForeground text-center'>{error}</p>}
          {success && <p className='p-c my-4 text-secondaryForeground text-center'>{success}</p>}
        </div>
      }
    </div>
  )
}
