export default function Card({ produto, btn }) {
  const numeroLoja = "5581991943001"

  const gerarLinkWhatsApp = (produto) => {
    const mensagem = `Olá, gostaria de comprar o produto: ${produto.name}, Preço: ${produto.price}`
    const url = `https://wa.me/${numeroLoja}?text=${encodeURIComponent(mensagem)}`
    return url
  }

  return (
    <div className="w-fit flex flex-col items-center cursor-grab">
      {produto?.image ? (
        <img className="img-c" loading="lazy" src={produto.image} alt={produto.name} />) : (<p>Imagem não disponível</p>
      )}

      <h3 className="h3-c">{produto.name}</h3>
      <p className="p-c mb-2">Preço: R$ {produto.price},00</p>

      {btn &&
        <button type="button">
          <a
            href={gerarLinkWhatsApp(produto)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >Comprar</a>
        </button>
      }
    </div>
  )
}
