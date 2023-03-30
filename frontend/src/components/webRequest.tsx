import React, { useEffect, useState } from "react";
import axios from "axios";

export function WebRequest() {
  // todo переменная
  const [getterData, setterData] = useState([]);
  // todo переменная

  // todo веб запрос
  async function setData() {
    const response = await axios({
      url: `data/`,
      method: "GET",
      timeout: 5000,
      data: {},
    });
    setterData(response.data.response);
  }
  // todo веб запрос

  // todo логирование в консоль
  useEffect(() => {
    console.log(getterData);
  }, [getterData]);
  // todo логирование в консоль

  return (
    <div className={"m-5 p-5 border border-5 border-warning"}>
      <button onClick={setData}>setData</button>
      {getterData && getterData.length > 0 ? (
        <ul>
          {getterData.map((item: { name: string }, index: number) => (
            <li key={index}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <li>данных нет!</li>
      )}
    </div>
  );
}
