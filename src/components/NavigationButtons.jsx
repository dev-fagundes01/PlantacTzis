import { useNavigate } from 'react-router-dom';
import cn from '../lib/utils';

export default function NavigationButtons({ className, register, manage }) {
  const navigate = useNavigate()

  return (
    <div className={cn('flex flex-col gap-2 md:flex-row', className)}>
      <button className={cn('btn-third md:mx-0', manage && 'text-base border-0 text-white')} type="button" onClick={() => navigate("/loja")}>Ir para a loja</button>
      {!register && <button className={cn('btn-third md:mx-0', manage && 'text-base border-0 text-white')} type="button" onClick={() => navigate("/cadastrar-produtos")}>Ir para cadastro</button>}
      {!manage && <button className='btn-third md:mx-0' type="button" onClick={() => navigate("/gerenciar-produtos")}>Ir para produtos</button>}
    </div>
  )
}
