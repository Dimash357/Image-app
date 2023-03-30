import React, { useState } from "react";

export function Counter1() {
  // let counter1 = 666; // todo МЫ ПРОБОВАЛИ, ОНА НЕ МЕНЯЛАСЬ НА ЭКРАНЕ
  // todo хук, который позволяет создать переменную которая при изменении заново рендерится на экране
  const [getterCounter2, setterCounter2] = useState(666);
  function increment() {
    setterCounter2(getterCounter2 + 1);
    console.log(getterCounter2);
  }
  function decrement() {
    setterCounter2(getterCounter2 - 1);
    console.log(getterCounter2);
  }
  return (
    <div>
      <div>
        {getterCounter2}
        <div className={"input-group"}>
          <button onClick={increment} className={"btn btn-lg btn-success"}>
            +
          </button>
          <button onClick={decrement} className={"btn btn-lg btn-danger"}>
            -
          </button>
        </div>
      </div>
    </div>
  );
}
