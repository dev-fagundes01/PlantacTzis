export default function Card({ item }) {
  return (
    <div className="w-fit flex flex-col items-center cursor-grab">
      <img className="img" src={item.image} alt="" />
      <h3 className="h3-c">{item.name}</h3>
      <button
        type="button"
        className="btn-secondary"
      >
        Comprar
      </button>
    </div>
  )
}
