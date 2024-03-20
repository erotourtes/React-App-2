import { TaskHistory } from "@/components/TaskHistory";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useGetAllHistoryQuery } from "@/redux/api/hooks";
import { Skeleton } from "@/components/ui/skeleton";

const AllHistoryList = ({ children }: React.PropsWithChildren) => {
  const { data: historyList = [], isLoading } = useGetAllHistoryQuery();

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="p-0 min-w-[500px]">
        <SheetHeader>
          <SheetTitle className="bg-primary text-primary-foreground px-3 py-4 text-left">
            History
          </SheetTitle>
          {isLoading && (
            <Skeleton className="p-3 space-y-3">
              <div className="h-5 bg-gray-300 rounded-md" />
              <div className="h-5 bg-gray-300 rounded-md" />
              <div className="h-5 bg-gray-300 rounded-md" />
            </Skeleton>
          )}
          <div className="p-3 text-left h-[calc(100vh-70px)] space-y-5 overflow-auto">
            {historyList.map((history) =>
              history.tableName === "task" ? (
                <div key={history.id} className="overflow-auto">
                  Task({history.name}):
                  <TaskHistory history={history} />
                </div>
              ) : null
            )}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default AllHistoryList;
