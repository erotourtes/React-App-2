export const BASE_URL = "React-App";
export const BOARD_URL = "board";
export const ERROR_URL = "error";

export const toBoard = (boardId: number) => `/${BASE_URL}/${BOARD_URL}/${boardId}`;
export const toHome = () => `/${BASE_URL}`;
export const toError = () => `/${BASE_URL}/${ERROR_URL}`;