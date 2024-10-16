import Google from '../assets/google-icon.png'

export default function AuthAdmin() {
  

  return (
    <div className="h-screen flex-utilities">
      <form className="div-c w-min p-6 bg-secondaryBackground flex flex-col items-center">
        <h1 className='w-48 text-xs text-secondaryForeground text-center font-semibold md:w-28. md:text-3xl'>Entre e Cadastre seus Produtos com Segurança</h1>
        <h3 className='h3-c mt-2 text-secondaryForeground justify-center'>Escolha uma opção</h3>

        <div className="flex flex-col">
          <label className='label-c' htmlFor="email">E-mail:</label>
          <input className='input-c' placeholder="exemplo@email.com" type="email" name="email" required />
        </div>

        <div className="flex flex-col">
          <label className='label-c' htmlFor="password">Senha:</label>
          <input className='input-c' placeholder="12345" type="password" name="password" required />
        </div>

        <button className="btn-primary mt-6 text-lg" type="submit">Entrar</button>
        <p className="p my-4 text-secondaryForeground">Ou entre com</p>
        <img className='rounded-full' src={Google} alt="Autenticação pelo Google" />
      </form>
    </div>
  )
}
