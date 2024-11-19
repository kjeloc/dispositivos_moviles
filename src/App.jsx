import { useState, useEffect } from "react";
import "./App.css";

function UseFetch(url){

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setData(data.message))
      .catch((error) => console.error("Error al cargar la imagen del perro:", error));
  }, [url]);
return data

}

function App() {
  const [url, setUrl] = useState("https://dog.ceo/api/breeds/image/random");
  const [debounceTimer, setDebounceTimer] = useState(null);
  const data = UseFetch(url);

  const fetchWithDebounce = () => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const timer = setTimeout(() => {
      setUrl(`https://dog.ceo/api/breeds/image/random?timestamp=${Date.now()}`); 
    }, 1100); 

    setDebounceTimer(timer); 
  };

  return (
    <>
      <div className="App">
        <h1>Perritos</h1>
        <button onClick={fetchWithDebounce}>Cargar un nuevo perrito</button>
        <div className="card">
          {data ? (
            <img src={data} alt="Un lindo perrito" style={{ width: "300px" }} />
          ) : (
            <p>Cargando imagen...</p>
          )}
        </div>
      </div>
    </>
  );
}

export default App;