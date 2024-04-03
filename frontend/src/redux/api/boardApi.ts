import { api } from "@/redux/api/apiSlice";
import { BoardT, CreateBoardDto } from "@packages/types";
import config from "@/config.ts";

export const boardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBoards: builder.query<BoardT[], void>({
      keepUnusedDataFor: config.CACHE_TIME,
      query: () => `board`,
    }),
    createBoard: builder.mutation<BoardT, CreateBoardDto>({
      query: (data) => ({
        url: `board`,
        method: "POST",
        body: data,
      }),
      onQueryStarted: (newBoard, { dispatch, queryFulfilled }) => {
        const id = -Math.floor(Math.random() * 1000);
        const patchResult = dispatch(
          boardApi.util.updateQueryData("getAllBoards", undefined, (boards) => [
            ...boards,
            { ...newBoard, id },
          ])
        );
        queryFulfilled.then(({ data: newBoard }) => {
          dispatch(
            boardApi.util.updateQueryData("getAllBoards", undefined, (boards) =>
              boards.map((b) => (b.id === id ? newBoard : b))
            ))
        }).catch(() => {
          patchResult.undo();
        });
      }
    }),
    deleteBoard: builder.mutation<void, BoardT>({
      query: (board) => ({
        url: `board/${board.id}`,
        method: "DELETE",
      }),
      onQueryStarted: (board, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          boardApi.util.updateQueryData("getAllBoards", undefined, (boards) =>
            boards.filter((b) => b.id !== board.id)
          )
        );
        queryFulfilled.catch(() => {
          patchResult.undo();
        });
      }
    }),
    updateBoard: builder.mutation<BoardT, BoardT>({
      query: (board) => ({
        url: `board`,
        method: "PATCH",
        body: board,
      }),
      onQueryStarted: (board, { dispatch, queryFulfilled }) => {
        const patchResult = dispatch(
          boardApi.util.updateQueryData("getAllBoards", undefined, (boards) =>
            boards.map((b) => (b.id === board.id ? board : b))
          )
        );
        queryFulfilled.catch(() => {
          patchResult.undo();
        });
      }
    }),
  }),
});
