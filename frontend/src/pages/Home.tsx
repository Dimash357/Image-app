// TODO ВНЕШНИЕ МОДУЛИ /////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// TODO ВНЕШНИЕ МОДУЛИ /////////////////////////////////////////////////////////////////////////////////////////////////

//

// TODO ВНУТРЕННИЕ МОДУЛИ //////////////////////////////////////////////////////////////////////////////////////////////

import * as components from "../components/ui/components";
import * as webRequests from "../components/webRequest";
import * as actions from "../components/actions";

// TODO ВНУТРЕННИЕ МОДУЛИ //////////////////////////////////////////////////////////////////////////////////////////////

//

export default function Page() {
  //

  // TODO ПЕРЕМЕННЫЕ ///////////////////////////////////////////////////////////////////////////////////////////////////

  // todo функция, которая переключает Reducer
  const dispatch = useDispatch();

  // todo Объект, который хранит данные из store
  // @ts-ignore
  const imagesStore = useSelector((state) => state.images);
  // @ts-ignore
  const dataStore = useSelector((state) => state.data);

  function setData() {
    dispatch({ type: "RESET_DATA" });
  }

  useEffect(() => {
    console.log(dataStore);
  }, [dataStore]);

  // todo Стрелочная функция
  // const getData = async () => {
  //   await actions.getImages(dispatch);
  // };

  // todo Обычная функция
  async function getData() {
    // await actions.getImages(`images/?page=2&filter=new`, "GET", dispatch);
  }

  // TODO ПЕРЕМЕННЫЕ ///////////////////////////////////////////////////////////////////////////////////////////////////

  //

  // TODO USEEFFECT-ы //////////////////////////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    console.log(imagesStore);
  }, [imagesStore]);

  // TODO USEEFFECT-ы //////////////////////////////////////////////////////////////////////////////////////////////////

  //

  return (
    <div className="">
      <components.Navbar1 title={"Home Page"} />
      <button onClick={setData}>setData</button>
      <webRequests.WebRequest />
      <components.webStatus storeVar={imagesStore} isArray={true} />
      <div className="container container-fluid">
        {imagesStore && imagesStore.data && imagesStore.data.length > 0 ? (
          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-3">
            {imagesStore.data.map(
              (
                // @ts-ignore
                item: {
                  title: string;
                  avatar: string;
                  id: number;
                  created: string;
                },
                // @ts-ignore
                index: number
              ) => (
                <div
                  key={item.id}
                  className="col card shadow m-0 p-0 text-center"
                >
                  <div className={"card-header m-0 p-1"}>{item.title}</div>
                  <div className={"card-body m-0 p-0 text-center"}>
                    <img
                      className="img-fluid"
                      width={"250"}
                      src={`/static${item.avatar}`} // src={`/static/img/new.jpg`}
                      alt={"image"}
                    />
                  </div>
                  <div className={"card-footer m-0 p-1 text-center"}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary"
                        >
                          Edit
                        </button>
                      </div>
                      <small className="text-muted">
                        {item.created.split("T")[0]}{" "}
                        {item.created.split("T")[1].split("+")[0]}
                      </small>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        ) : imagesStore.load === true ? (
          ""
        ) : (
          <div className="col card shadow">данных нет</div>
        )}
      </div>
    </div>
  );
}
