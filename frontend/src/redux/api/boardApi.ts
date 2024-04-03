import { api } from "@/redux/api/apiSlice";
import { BoardT, CreateBoardDto, TaskListT } from "@packages/types";

export const boardApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllBoards: builder.query<BoardT[], void>({
      query: () => `board`,
    }),
    getBoardLists: builder.query<TaskListT[], number>({
      query: (boardId) => `board/${boardId}`,
    }),
    createBoard: builder.mutation<BoardT, CreateBoardDto>({
      query: (data) => ({
        url: `board`,
        method: "POST",
        body: data,
      }),
    })
  }),
});
