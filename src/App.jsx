import Background from "./components/Background";
import Title from "./components/Title";

function App() {
  return (
    <div className='h-screen flex flex-col items-center bg-background'>
      <Background />
      <form action="">
        <Title>R-Plantas</Title>
      </form>
    </div>
  );
}

export default App;
