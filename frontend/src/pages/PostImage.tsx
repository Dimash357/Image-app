// TODO ВНЕШНИЕ МОДУЛИ /////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// TODO ВНЕШНИЕ МОДУЛИ /////////////////////////////////////////////////////////////////////////////////////////////////

//

// TODO ВНУТРЕННИЕ МОДУЛИ //////////////////////////////////////////////////////////////////////////////////////////////

import * as components from "../components/ui/components";
import * as actions from "../components/actions";
import * as counter from "../components/counter";

// TODO ВНУТРЕННИЕ МОДУЛИ //////////////////////////////////////////////////////////////////////////////////////////////

//

export default function Page() {
  //

  // TODO ПЕРЕМЕННЫЕ ///////////////////////////////////////////////////////////////////////////////////////////////////

  // todo функция, которая переключает Reducer
  const dispatch = useDispatch();

  // todo Объект, который хранит данные из store
  // @ts-ignore
  const imagesUpload = useSelector((state) => state.image_upload);

  // todo Объект, который будет отправлен в Django
  const [imageFormObj, setImageFormObj] = useState({
    title: "",
    description: "",
    avatar: null,
    dangerAvatar: false,
  });

  // TODO ПЕРЕМЕННЫЕ ///////////////////////////////////////////////////////////////////////////////////////////////////

  //

  // TODO ACTION-ы /////////////////////////////////////////////////////////////////////////////////////////////////////

  // todo логика отправки
  async function formSubmit() {
    if (imageFormObj.dangerAvatar) {
      return;
    }

    const form = [
      ["title", imageFormObj.title],
      ["description", imageFormObj.description],
      ["avatar", imageFormObj.avatar],
    ];

    await actions.sendData(`images/upload/`, "POST", form, dispatch);
  }

  // todo логика сброса формы
  function formReset() {
    setImageFormObj({
      title: "",
      description: "",
      avatar: null,
      dangerAvatar: false,
    });
  }

  // TODO ACTION-ы /////////////////////////////////////////////////////////////////////////////////////////////////////

  //

  // TODO USEEFFECT-ы //////////////////////////////////////////////////////////////////////////////////////////////////

  // todo Логика, если данные успешно отправлены на сервер, то форму надо сбросить
  useEffect(() => {
    if (imagesUpload.data) {
      formReset();
    }
  }, [imagesUpload.data]);

  useEffect(() => {
    console.log("Страдание");
  }, []);

  // todo логика проверки размера картинки
  useEffect(() => {
    if (imageFormObj.avatar) {
      // @ts-ignore
      const danger = imageFormObj.avatar.size > 10 * 1024 * 1024;

      setImageFormObj({
        ...imageFormObj,
        dangerAvatar: danger,
      });
    }
  }, [imageFormObj.avatar]);

  // TODO USEEFFECT-ы //////////////////////////////////////////////////////////////////////////////////////////////////

  //

  // TODO JSX(HTML + REACT) ////////////////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="">
      <components.Navbar1 title={"Post Image Page"} />
      <components.Accordion1
        accordionHeader={"Форма для добавления изображений!"}
        color={"bg-light"}
        isCollapse={false}
      >
        <components.webStatus storeVar={imagesUpload} />

        <form
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            formSubmit();
          }}
          onReset={() => formReset()}
        >
          <div className="card shadow m-0 p-0">
            <div className="card-header bg-success bg-opacity-10 m-0 p-2">
              <h6 className="lead fw-bold m-0 p-0">
                Отправить новое изображение
              </h6>
              <h6 className="lead m-0 p-0">в общий список</h6>
            </div>
            <div className="card-body m-0 p-0">
              <div className="m-0 p-0">
                <label className="form-control-sm text-center w-75 m-0 p-1">
                  Название:
                  <input
                    type="text"
                    className="form-control form-control-sm text-center m-0 p-1"
                    placeholder="введите название тут..."
                    minLength={5}
                    maxLength={300}
                    required
                    value={imageFormObj.title}
                    onChange={(event) =>
                      setImageFormObj({
                        ...imageFormObj, // этот '...' оператор аналог *args/**kwargs
                        title: event.target.value.replace(
                          new RegExp(`[^$0-9А-Яа-я]`, "g"),
                          ""
                        ),
                      })
                    }
                  />
                  <small className="text-warning m-0 p-0">
                    * только кириллица и цифры
                    <small className="text-muted m-0 p-0">
                      {" "}
                      * длина: не менее 5 и более 300 символов
                    </small>
                  </small>
                </label>
              </div>
              <div className="m-0 p-0">
                <label className="w-100 form-control-sm m-0 p-1">
                  Описание идеи:
                  <textarea
                    className="form-control form-control-sm text-center m-0 p-1"
                    placeholder="введите описание тут..."
                    minLength={0}
                    maxLength={1000}
                    rows={3}
                    value={imageFormObj.description}
                    onChange={(event) =>
                      setImageFormObj({
                        ...imageFormObj,
                        description: event.target.value.replace(
                          new RegExp(`[^$0-9А-Яа-яA-Za-z!,.]`, "g"),
                          ""
                        ),
                      })
                    }
                  />
                  <small className="m-0 p-0">
                    <small className="text-muted m-0 p-0">
                      {" "}
                      * длина: не более 1000 символов
                    </small>
                  </small>
                </label>
              </div>
              <div className="m-0 p-0">
                <label className="form-control-sm text-center m-0 p-1">
                  Аватарка-заставка:
                  {imageFormObj.dangerAvatar && (
                    <div className="alert alert-danger" role="alert">
                      Изображение слишком крупное (нужно менее 10 мб)!
                    </div>
                  )}
                  <input
                    type="file"
                    className="form-control form-control-sm text-center m-0 p-1"
                    accept=".jpg, .jpeg, .bmp, .png"
                    onChange={(event) =>
                      setImageFormObj({
                        ...imageFormObj,
                        // @ts-ignore
                        avatar: event.target.files[0],
                      })
                    }
                  />
                  <small className="text-muted m-0 p-0">* не обязательно</small>
                </label>
              </div>
            </div>
            <div className="card-footer m-0 p-0">
              <ul className="btn-group row nav row-cols-auto row-cols-md-auto row-cols-lg-auto justify-content-center m-0 p-0">
                <button
                  className={
                    imageFormObj.dangerAvatar
                      ? "btn btn-sm btn-primary m-1 p-2 disabled"
                      : "btn btn-sm btn-primary m-1 p-2"
                  }
                  type="submit"
                >
                  <i className="fa-solid fa-circle-check m-0 p-1" />
                  отправить данные
                </button>
                <button className="btn btn-sm btn-warning m-1 p-2" type="reset">
                  <i className="fa-solid fa-pen-nib m-0 p-1" />
                  сбросить данные
                </button>
              </ul>
            </div>
          </div>
        </form>
      </components.Accordion1>
    </div>
  );
}
