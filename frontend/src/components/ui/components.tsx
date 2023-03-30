import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import * as constants from "../constants";

// @ts-ignore
export function Accordion1({
  // @ts-ignore
  accordionHeader,
  color = "bg-primary",
  isCollapse = true,
  // @ts-ignore
  children,
}) {
  function switchCollapse() {
    const obj = document.getElementById("accordion1");
    const classname =
      // @ts-ignore
      obj.getAttribute("class") === "accordion-collapse collapse m-0 p-0"
        ? "accordion-collapse m-0 p-0"
        : "accordion-collapse collapse m-0 p-0";
    // @ts-ignore
    obj.setAttribute("class", classname);
  }
  return (
    <div className={""}>
      <div
        className="accordion container container-fluid"
        id="accordionPanelsStayOpenExample"
      >
        <div className="accordion-item">
          <h2 className="accordion-header" id="panelsStayOpen-headingOne">
            <button
              className={`accordion-button ${color}`}
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#panelsStayOpen-collapseOne"
              aria-expanded="true"
              aria-controls="panelsStayOpen-collapseOne"
              onClick={switchCollapse}
            >
              {accordionHeader}
            </button>
          </h2>
          <div
            id="accordion1"
            className={
              isCollapse
                ? "accordion-collapse collapse m-0 p-0"
                : "accordion-collapse m-0 p-0"
            }
            aria-labelledby="panelsStayOpen-headingOne"
          >
            <div className="accordion-body">{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// @ts-ignore
export function Navbar1({ title }) {
  // todo форма и её поля
  const [getterFormObj, setterFormObj] = useState({
    pk: 1,
    isOdd: true,
    datetime: Date.toString(),
  });
  const [getterDanger, setterDanger] = useState(false);
  // todo форма и её поля
  const [getterMessage, setterMessage] = useState([]);
  const [getterCount, setterCount] = useState(0);

  const [getterTimer, setterTimer] = useState(Date().toString());

  async function GetData() {
    try {
      const response = await axios(
        `notifications/` +
          `?filter=main&day=night&pk=${getterFormObj.pk}&isOdd=${getterFormObj.isOdd}`
      );
      if (response.data && response.data.response) {
        console.log(response.data.response);
        // setterMessage(response.data.response);
        setterCount(response.data.response.count);
        setterDanger(false);
      } else {
        setterDanger(true);
      }

      setTimeout(async () => {
        setterTimer(Date().toString());
      }, constants.delayMiddle);
    } catch (error) {
      console.log(error);
      setterDanger(true);

      setTimeout(async () => {
        setterTimer(Date().toString());
      }, constants.delayMiddle);
    }
  }

  useEffect(() => {
    GetData();
  }, [getterTimer]);

  return (
    <div>
      <div className={"container text-center m-1 p-1"}>
        {getterCount !== undefined && (
          <div className={"text-danger display-1"}>{getterCount}</div>
        )}
        {getterDanger === true && (
          <div className={"text-danger display-6"}>ОШИБКА СВЯЗИ!</div>
        )}

        <div className={"border border-danger border-3"}>
          {/*{getterMessage && <div className={"display-6"}>{getterMessage}</div>}*/}

          {getterMessage && getterMessage.length > 0 && (
            <ul>
              {getterMessage.map((item, index) => (
                <li>
                  {
                    // @ts-ignore
                    item.title
                  }
                </li>
              ))}
            </ul>
          )}

          <select
            className="form-select form-select-lg mb-3"
            aria-label=".form-select-lg example"
            required
            onChange={(event) =>
              setterFormObj({
                ...getterFormObj,
                // @ts-ignore
                pk: event.target.value,
              })
            }
          >
            <option selected>Open this select menu</option>
            <option selected value="1">
              One
            </option>
            <option value="2">Two</option>
            <option value="3">Three</option>
            <option value="4">Fourth</option>
          </select>
          <select
            className="form-select form-select-lg mb-3"
            aria-label=".form-select-lg example"
            required
            // @ts-ignore
            onChange={(event) => {
              setterFormObj({
                ...getterFormObj,
                // @ts-ignore
                isOdd: event.target.value,
              });
              GetData();
            }}
          >
            <option
              selected
              // @ts-ignore
              value={"true"}
            >
              Чётные
            </option>
            <option
              // @ts-ignore
              value={"false"}
            >
              Нечётные
            </option>
            <option value="3">Three</option>
            <option value="4">Fourth</option>
          </select>
        </div>
        <Link
          className={"text-decoration-none btn btn-lg btn-outline-primary"}
          to={"/"}
        >
          Image list
        </Link>
        <Link
          className={"text-decoration-none btn btn-lg btn-outline-secondary"}
          to={"/upload"}
        >
          Upload Image
        </Link>
      </div>
      <header className="display-6 text-center m-1 p-1">{title}</header>
    </div>
  );
}

// @ts-ignore
export function webStatus({ storeVar, isArray = false }) {
  return (
    <div>
      {storeVar.load === true && (
        <div className="text-center alert alert-success" role="alert">
          Идёт загрузка!
        </div>
      )}
      {storeVar.error && (
        <div className="text-center alert alert-danger" role="alert">
          {storeVar.error}
        </div>
      )}
      {storeVar.fail && (
        <div className="text-center alert alert-danger" role="alert">
          {storeVar.fail}
        </div>
      )}
      {storeVar.data && isArray === false && (
        <div className="text-center alert alert-success" role="alert">
          {storeVar.data}
        </div>
      )}
    </div>
  );
}
