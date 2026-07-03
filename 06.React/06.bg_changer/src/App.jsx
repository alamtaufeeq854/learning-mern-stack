import { useState } from "react";

function App() {
  const [color, setColor] = useState("olive");

  // function changeColor(color) {
  //   setColor(color);
  // }

  return (
    <div
      className="w-full h-screen duration-200"
      style={{ backgroundColor: color }}>
      <div className="fixed flex flex-wrap justify-center bottom-12 inset-x-0 ps-2">
        <div className="flex flex-wrap justify-center gap-3 shadow-lg bg-white px-3 py-2 rounded-3xl">
          <button
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg "
            onClick={() => setColor("red")}
            style={{ backgroundColor: "red" }}>
            Red
          </button>
          <button
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg "
            onClick={() => setColor("blue")}
            style={{ backgroundColor: "blue" }}>
            Blue
          </button>
          <button
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg "
            onClick={() => setColor("green")}
            style={{ backgroundColor: "green" }}>
            Green
          </button>
          <button
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg "
            onClick={() => setColor("indigo")}
            style={{ backgroundColor: "indigo" }}>
            Indigo
          </button>
          <button
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg "
            onClick={() => setColor("maroon")}
            style={{ backgroundColor: "maroon" }}>
            Maroon
          </button>
          <button
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg "
            onClick={() => setColor("black")}
            style={{ backgroundColor: "black" }}>
            Black
          </button>
          <button
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg "
            onClick={() => setColor("purple")}
            style={{ backgroundColor: "purple" }}>
            Purple
          </button>
          <button
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg "
            onClick={() => setColor("brown")}
            style={{ backgroundColor: "brown" }}>
            Brown
          </button>
          <button
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg "
            onClick={() => setColor("navy")}
            style={{ backgroundColor: "navy" }}>
            Navy
          </button>
          <button
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
            onClick={() => setColor("midnightblue")}
            style={{ backgroundColor: "midnightblue" }}>
            Midnight Blue
          </button>
          <button
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
            onClick={() => setColor("darkgreen")}
            style={{ backgroundColor: "darkgreen" }}>
            Dark Green
          </button>
          <button
            className="outline-none px-4 py-1 rounded-full text-white shadow-lg"
            onClick={() => setColor("darkslategray")}
            style={{ backgroundColor: "darkslategray" }}>
            Dark Slate Gray
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
