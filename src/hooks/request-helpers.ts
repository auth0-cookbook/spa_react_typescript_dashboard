export const baseURL = process.env.REACT_APP_SERVER_URL;
export const itemsPath = "items";
export const itemsReqUrl = new URL(itemsPath, baseURL).href;
