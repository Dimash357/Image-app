import axios from "axios";

export async function sendData(
  url: string,
  method: string,
  form: any,
  dispatch: any
) {
  try {
    const formData = new FormData();
    form.forEach(
      // @ts-ignore
      (item) => formData.append(item[0], item[1])
    );
    dispatch({ type: "LOAD_IMAGE_UPLOAD", payload: undefined });
    const response = await axios({
      url: url,
      method: method,
      data: formData,
    });
    // @ts-ignore
    if (response.status !== 200 || response.status !== 201) {
      dispatch({ type: "DATA_IMAGE_UPLOAD", payload: response.data.response });
    } else {
      dispatch({ type: "ERROR_IMAGE_UPLOAD", payload: undefined });
    }
  } catch (error) {
    console.log(`error: `, error);
    dispatch({
      type: "FAIL_IMAGE_UPLOAD",
      // @ts-ignore
      payload: undefined,
    });
  }
}
// @ts-ignore
export async function getImages(url, method, dispatch: any) {
  try {
    dispatch({ type: "LOAD_IMAGES", payload: undefined });
    const config = {
      url: url,
      method: method,
      timeout: 7000,
      // headers: {
      // Authorization: ``,
      // },
      data: {},
    };
    const response = await axios(config);
    // @ts-ignore
    if (response.status !== 200 || response.status !== 201) {
      dispatch({ type: "DATA_IMAGES", payload: response.data.response });
    } else {
      dispatch({ type: "ERROR_IMAGES", payload: response.status });
    }
  } catch (error) {
    console.log(`error: `, error);
    // @ts-ignore
    dispatch({ type: "FAIL_IMAGES", payload: `error: ${error.toString()}` });
  }
}
