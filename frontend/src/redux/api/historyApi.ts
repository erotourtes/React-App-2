import config from "@/config";
import { api } from "@/redux/api/apiSlice";
import { WebSocketService } from "@/redux/api/wsService";
import { HistoryT } from "@packages/types";

const wsService = WebSocketService.create(config.WS_URL);

export const historyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllHistory: builder.query<HistoryT[], number>({
      query: (boardId: number) => `history/tasks?boardId=${boardId}`,
      onCacheEntryAdded: async (_, { updateCachedData }) => {
        wsService.on<HistoryT>("history:task:new", (data) => {
          updateCachedData((draft) => {
            draft?.push(data);
          });
        });
      },
    }),
    getHistoryForTask: builder.query<HistoryT[], number>({
      query: (taskId) => `history/tasks/${taskId}`,
      onCacheEntryAdded: async (_, { dispatch }) => {
        wsService.on<HistoryT>("history:task:new", (data) => {
          dispatch(
            historyApi.util.updateQueryData(
              "getHistoryForTask",
              +data.recordId,
              (tasks) => tasks.concat(data)
            )
          );
        });
      },
    }),
  }),
});
