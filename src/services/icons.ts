import { ICON_API_URL, type IconResponse } from "../response/Icon";
import { getData } from "./fetchData";

export const getIcons = () => getData<IconResponse>(ICON_API_URL);