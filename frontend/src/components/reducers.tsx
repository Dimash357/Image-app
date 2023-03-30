export function ImagesListReducer(
  state = {},
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "LOAD_IMAGES": {
      return { load: true, data: undefined, error: undefined };
    }
    case "DATA_IMAGES": {
      return { load: false, data: action.payload, error: undefined };
    }
    case "ERROR_IMAGES": {
      return { load: false, data: action.payload, error: "Произошла ошибка" };
    }
    case "FAIL_IMAGES": {
      return { load: false, data: action.payload, error: "Произошла ошибка" };
    }
    case "RESET_IMAGES": {
      return { load: false, data: action.payload, error: "Произошла ошибка" };
    }
    default: {
      return state;
    }
  }
}

export function ImageUploadReducer(
  state = {},
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "LOAD_IMAGE_UPLOAD": {
      return { load: true, data: undefined, error: undefined };
    }
    case "DATA_IMAGE_UPLOAD": {
      return { load: false, data: action.payload, error: undefined };
    }
    case "ERROR_IMAGE_UPLOAD": {
      return { load: false, data: action.payload, error: "Произошла ошибка" };
    }
    case "FAIL_IMAGE_UPLOAD": {
      return { load: false, data: action.payload, error: "Произошла ошибка" };
    }
    case "RESET_IMAGE_UPLOAD": {
      return { load: false, data: undefined, error: undefined };
    }
    default: {
      return state;
    }
  }
}

export function DataReducer(
  state = {},
  action: { type: string; payload: any }
) {
  switch (action.type) {
    case "LOAD_DATA": {
      return { load: true, data: undefined, error: undefined };
    }
    case "DATA_DATA": {
      return { load: false, data: action.payload, error: undefined };
    }
    case "ERROR_DATA": {
      return { load: false, data: action.payload, error: "Привет Данат" };
    }
    case "FAIL_DATA": {
      return { load: false, data: action.payload, error: "Произошла ошибка" };
    }
    case "RESET_DATA": {
      return { load: false, data: undefined, error: undefined };
    }
    default: {
      return state;
    }
  }
}
