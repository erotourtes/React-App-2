import { api } from "@/redux/api/apiSlice";
import { BoardT, CreateBoardDto } from "@packages/types";
import config from "@/config.ts";
import { createSelector } from "@reduxjs/toolkit";
import { useGetAllBoardsQuery } from "@redux/api/hooks.ts";
import { useMemo } from "react";

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
            { ...newBoard, id, createdAt: new Date().toISOString() },
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


export const useGetBoardById = (boardId: number) => {
  const selectPostsForUser = useMemo(() => {
    return createSelector(
      res => res.data,
      (_, boardId) => boardId,
      (data: BoardT[] | undefined, boardId) => data?.find((b) => b.id === +boardId)
    )
  }, [])

  return useGetAllBoardsQuery(undefined, {
    selectFromResult: (result) => ({
      ...result,
      board: selectPostsForUser(result, boardId)
    })
  })
}