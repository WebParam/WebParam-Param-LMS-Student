import { Diagnostic } from "./util-logger";

export const post = async (url: string, body: any) => {
  try {
    if (
      !process.env.NEXT_PUBLIC_CLIENTKEY ||
      process.env.NEXT_PUBLIC_CLIENTKEY.length < 0
    ) {
      throw "ClientKey not available";
    }

    const res = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Client-Key": process.env.NEXT_PUBLIC_CLIENTKEY,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    Diagnostic(`SUCCESS ON POST ${url}, returning`, data);
    debugger;
    return data;
  } catch (err) {
    debugger;
    console.log(`[API ERROR : Method: POST; Endpoint: ${url}]`, err);
    Diagnostic("ERROR ON POST, returning", err);
    return err;
  }
};

export const put = async (url: string, body: any) => {
  try {
    if (
      !process.env.NEXT_PUBLIC_CLIENTKEY ||
      process.env.NEXT_PUBLIC_CLIENTKEY.length < 0
    ) {
      throw "ClientKey not available";
    }

    const res = await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Client-Key": process.env.NEXT_PUBLIC_CLIENTKEY,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    Diagnostic(`SUCCESS ON PUT ${url}, returning`, data);
    return data;
  } catch (err) {
    console.log(`[API ERROR : Method: PUT; Endpoint: ${url}]`, err);
    Diagnostic("ERROR ON PUT, returning", err);
    return err;
  }
};

export const del = async (url: string) => {
  try {
    if (
      !process.env.NEXT_PUBLIC_CLIENTKEY ||
      process.env.NEXT_PUBLIC_CLIENTKEY.length < 0
    ) {
      throw "ClientKey not available";
    }

    const res = await fetch(url, {
      method: "DELETE",
      headers: {
        "Client-Key": process.env.NEXT_PUBLIC_CLIENTKEY,
      },
    });
    const data = await res.json();
    Diagnostic(`SUCCESS ON DELETE ${url}, returning`, data);
    return data;
  } catch (err) {
    console.log(`[API ERROR : Method: DELETE; Endpoint: ${url}]`, err);
    Diagnostic("ERROR ON DELETE, returning", err);
    return err;
  }
};

export const get = async (url: string) => {
  try {
    if (
      !process.env.NEXT_PUBLIC_CLIENTKEY ||
      process.env.NEXT_PUBLIC_CLIENTKEY.length < 0
    ) {
      throw "ClientKey not available";
    }

    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Client-Key": process.env.NEXT_PUBLIC_CLIENTKEY,
      },
      cache: "no-store",
    });

    // Check if the response is JSON
    const contentType = res.headers.get("Content-Type");
    if (!contentType || !contentType.includes("application/json")) {
      throw "Expected JSON response, got something else";
    }

    const data = await res.json();
    Diagnostic(`SUCCESS ON GET ${url}, returning`, data);
    return data;
  } catch (err) {
    console.log(`[API ERROR : Method: GET; Endpoint: ${url}]`, err);
    Diagnostic("ERROR ON GET, returning", err);
    return err;
  }
};

export function generateRandomUserId(length?: number) {
  length = length || 8;
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var result = "";
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export const removeTags = (str: string) => {
  const textArea = document.createElement("textarea");
  textArea.innerHTML = str;
  return textArea.value.replace(/<\/?[^>]+(>|$)/g, "");
};

export const formDataEntriesArray = (entries: any) => {
  const objMap: { [key: string]: { [key: string]: FormDataEntryValue } } = {};

  for (const entry of entries) {
    const [key, value] = entry;
    const matches = key.match(/^options\[(.+)\]\[(\w+)\]$/);
    if (matches) {
      const index = matches[1];
      const propName = matches[2];

      if (!objMap[index]) {
        objMap[index] = {};
      }

      objMap[index][propName] = value;
    }
  }

  const objArray: { [key: string]: FormDataEntryValue }[] =
    Object.values(objMap);
  return objArray;
};
export const downloadFile = (
  url: string,
  filename: string,
  fileExtension: string,
  setExportModal: (isBool: boolean) => void,
  isGet = false
) => {
  setExportModal(true);

  try {
    if (
      !process.env.NEXT_PUBLIC_CLIENTKEY ||
      process.env.NEXT_PUBLIC_CLIENTKEY.length < 0
    ) {
      throw "ClientKey not available";
    }

    fetch(url, {
      method: isGet ? "GET" : "POST",
      headers: {
        Accept:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Type": "application/json",
        "Client-Key": process.env.NEXT_PUBLIC_CLIENTKEY,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.blob();
      })
      .then((blob) => {
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", `${filename}.${fileExtension}`);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(downloadUrl);
        setExportModal(false);
      })
      .catch((error) => {
        console.error("Error exporting file:", error);
        setExportModal(false);
      });
  } catch (err) {
    console.log(`[API ERROR : Method: GET; Endpoint: ${url}]`, err);
    Diagnostic("ERROR ON GET, returning", err);
    return err;
  }
};