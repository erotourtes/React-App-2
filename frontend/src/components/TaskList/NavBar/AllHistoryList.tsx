import { TaskHistory } from "@/components/TaskHistory";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@components/ui/sheet.tsx";
import { useGetAllHistoryQuery } from "@/redux/api/hooks";
import { Skeleton } from "@/components/ui/skeleton";

interface AllHistoryListProps {
  children: React.ReactNode;
  boardId: number;
}

const AllHistoryList = ({ children, boardId }: AllHistoryListProps) => {
  const { data: historyList = [], isLoading } = useGetAllHistoryQuery(boardId);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="p-0 min-w-[90vw] md:min-w-[500px] lg:min-w-[800px]">
        <SheetHeader>
          <SheetTitle className="bg-primary text-primary-foreground px-3 py-4 text-left">
            History
          </SheetTitle>
          {isLoading && (
            <Skeleton className="p-3 space-y-3">
              <div className="h-5 bg-gray-300 rounded-md"/>
              <div className="h-5 bg-gray-300 rounded-md"/>
              <div className="h-5 bg-gray-300 rounded-md"/>
            </Skeleton>
          )}
          <div className="p-3 text-left h-[calc(100vh-70px)] space-y-5 overflow-auto">
            {historyList.map((history) =>
              <div key={history.id} className="overflow-auto">
                Task({history.task.name}):
                <TaskHistory history={history}/>
              </div>
            )}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default AllHistoryList;
