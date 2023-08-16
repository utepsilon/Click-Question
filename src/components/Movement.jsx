import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  margin: 1rem;
  padding: 1rem;
  height: auto;
  background: crimson;
  color: snow;
  border: none;
  border-radius: 10px;
`;

const Canvas = styled.div`
  .canvas {
    height: 700px;
    width: 80%;
    border: 1px solid;
    position: absolute;
    left: 10%;
    top: 10%;
  }
`;
const Movement = () => {
  const [mouseCoordinatesList, setMouseCoordinatesList] = useState([]);

  const [style, setStyle] = useState();

  const setCoordinates = (x, y) => {
    return {
      position: "absolute",
      left: x - 80 + "px",
      top: y - 80 + "px",
      height: "20px",
      width: "20px",
      background: "crimson",
      "border-radius": "50%",
      color: "snow",
      padding: "5px"
    };
  };

  const handleUndo = () => {
    let list = [...mouseCoordinatesList];
    list.pop(mouseCoordinatesList.length - 1);
    setMouseCoordinatesList(list);
  };
  const mouseMoveHandler = async (event) => {
    await setStyle(setCoordinates(event.clientX, event.clientY));
    let list = [];
    if (mouseCoordinatesList.length > 0) {
      list = [...mouseCoordinatesList];
      list.push(setCoordinates(event.clientX, event.clientY));
    } else {
      list = [setCoordinates(event.clientX, event.clientY)];
    }
    await setMouseCoordinatesList(list);
  };
  useEffect(() => {
    const canvas = document.getElementById("canvas");
    console.log(mouseCoordinatesList);
    canvas.addEventListener("click", mouseMoveHandler);
    return () => {
      canvas.removeEventListener(`click`, mouseMoveHandler);
    };
  }, [setStyle, style, setMouseCoordinatesList, setCoordinates]);
  return (
    <>
      <Button onClick={handleUndo} className="btn">
        Undo
      </Button>
      <Canvas>
        <div className="canvas" id="canvas">
          {mouseCoordinatesList.map((circle, index) => {
            return <div style={circle}>{index + 1}</div>;
          })}
        </div>
      </Canvas>
    </>
  );
};

export default Movement;
