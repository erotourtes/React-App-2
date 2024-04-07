import config from "@/config";
import { api } from "@/redux/api/apiSlice";
import { WebSocketService } from "@/redux/api/wsService";
import { HistoryT, HistoryActionType } from "@packages/types";

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
    getHistoryForTask: builder.query<HistoryT[], number>({
      keepUnusedDataFor: config.CACHE_TIME,
      query: (taskId) => `history/tasks/${taskId}`,
      onCacheEntryAdded: async (_, { dispatch }) => {
        wsService.on<HistoryT>("history:task:new", (data) => {
          dispatch(
            historyApi.util.updateQueryData(
              "getHistoryForTask",
              data.recordId,
              (tasks) => tasks.concat(data)
            )
          );
        });
      },
    }),
  }),
});
