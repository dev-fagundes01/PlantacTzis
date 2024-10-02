export default function Card({ item }) {
  return (
    <div className="w-fit flex flex-col items-center cursor-grab">
      <img className="w-52 h-48 rounded-sm" src={item.image} alt="" />
      <h3 className="h3">{item.name}</h3>
      <button
        type="button"
        className="btn-secondary"
      >
        Comprar
      </button>
    </div>
  )
}
