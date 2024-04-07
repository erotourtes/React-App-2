import config from "@/config";
import { api } from "@/redux/api/apiSlice";
import { WebSocketService } from "@/redux/api/wsService";
import { HistoryT, HistoryActionType } from "@packages/types";
import { createSelector } from "@reduxjs/toolkit";
import { useGetAllHistoryQuery } from "@redux/api/hooks.ts";
import { useMemo } from "react";

const wsService = WebSocketService.create(config.WS_URL);

export const historyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllHistory: builder.query<HistoryT[], number>({
      query: (boardId: number) => `history/tasks?boardId=${boardId}`,
      keepUnusedDataFor: config.CACHE_TIME,
      onCacheEntryAdded: async (_, { dispatch }) => {
        wsService.on<HistoryT>("history:task:new", (history) => {
          dispatch(historyApi.util.updateQueryData("getAllHistory", history.boardId,
            (draft) => {
              draft = draft ?? [];
              if (history.actionType === HistoryActionType.UPDATE && history.fieldName === "name") {
                draft
                  .filter((t) => t.recordId === history.recordId)
                  .forEach((t) => t.task.name = history.newValue ?? "");
              }
              draft?.push(history)
            }
          ));
        });
      },
    }),
  }),
});

export const useGetHistoryForTask = (boardId: number, taskId: number) => {
  const selectTaskHistory = useMemo(() => createSelector(
    res => res.data,
    (_, boardId) => boardId,
    (data: HistoryT[] | undefined) => data?.filter((h) => h.recordId === taskId) ?? null
  ), [taskId])

  return useGetAllHistoryQuery(boardId, {
    selectFromResult: (result) => ({
      ...result,
      historyList: selectTaskHistory(result, boardId)
    })
  })
}

