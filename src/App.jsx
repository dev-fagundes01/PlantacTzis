import Background from "./components/Background";
import Title from "./components/Title";

function App() {
  return (
    <div className='h-screen flex flex-col items-center bg-background'>
      <Background />
      <form>
        <Title>Cadastre suas Plantas</Title>

        <div className="my-5 flex flex-col">
          <label className="text-white mr-1" htmlFor="name">Nome:</label>
          <input className="rounded-lg p-1" placeholder="Tulipas" type="text" name="name" />
        </div>
        <div className="my-5 flex flex-col">
          <label className="text-white mr-2" htmlFor="price">Preço:</label>
          <input className="rounded-lg p-1" placeholder="15" type="number" name="price" />
        </div>
        <div className="my-5 flex flex-col">
          <label className="text-white mr-4" htmlFor="Category">Categoria:</label>
          <input className="rounded-lg p-1" placeholder="Plantas com Flores" type="text" name="Category" />
        </div>
        <button className="w-full text-2xl rounded-lg" type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default App;
