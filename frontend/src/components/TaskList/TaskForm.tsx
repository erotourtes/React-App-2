import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { strDateFormat } from "@/utils/utils";
import { Button } from "@components/ui/button";
import { Calendar } from "@components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@components/ui/form";
import { Input } from "@components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { CreateTaskDto, TaskListT, TaskPriority, TaskT } from "@packages/types";
import { BarChart, CalendarIcon, FileBarChart2, Pencil } from "lucide-react";
import { useContext, createContext } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { H3 } from "@/components/typography";
import MoveToListSelect from "@/components/TaskList/MoveToListSelect";
import { useGetAllTaskListsQuery } from "@/redux/api/hooks";

interface TaskFormProps {
  task?: TaskT;
  selectedList: TaskListT;
  onSubmit: (data: CreateTaskDto) => void;
  edit?: boolean;
  onEditRequest?: () => void;
}

const FormContext = createContext<{
  form: UseFormReturn<CreateTaskDto>;
  edit: boolean;
}>({
  form: {} as UseFormReturn<CreateTaskDto>,
  edit: false,
});

export function TaskForm({
  task,
  selectedList,
  edit,
  onSubmit,
  onEditRequest,
}: TaskFormProps) {
  // CreateTaskDto and UpdateTaskDto are the same
  const form = useForm<CreateTaskDto>({
    resolver: classValidatorResolver(CreateTaskDto),
    defaultValues: {
      name: task?.name || "",
      priority: task?.priority || undefined,
      description: task?.description || "",
      dueDate: task?.dueDate || undefined,
      listId: selectedList.id,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormContext.Provider value={{ form, edit: edit == true }}>
          <FormName onEditRequest={onEditRequest} />
          <FormStatus listId={selectedList.id} boardId={selectedList.boardId} />
          <FormDate />
          <FormPriority />
          <FormDescription />
          {edit && <Button type="submit">Submit</Button>}
        </FormContext.Provider>
      </form>
    </Form>
  );
}

const FormName = ({ onEditRequest }: { onEditRequest?: () => void }) => {
  const { form, edit } = useContext(FormContext);

  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          {edit ? (
            <Input
              placeholder="Name"
              className="text-2xl font-semibold tracking-tight"
              {...field}
            />
          ) : (
            <div className="flex justify-between items-center flex-wrap overflow-auto">
              <H3>{field.value}</H3>
              <Button
                variant="outline"
                className={"focus-visible:ring-transparent"}
                onClick={(e) => {
                  e.preventDefault();
                  onEditRequest?.call(null);
                }}
              >
                <Pencil className="h-4 w-4 mr-3" />
                Edit Task
              </Button>
            </div>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const FormStatus = ({
  listId,
  boardId,
}: {
  listId: number;
  boardId: number;
}) => {
  const { form, edit } = useContext(FormContext);
  const { data: lists = [] } = useGetAllTaskListsQuery(boardId);
  const selectedList = lists?.find((list) => list.id === listId);

  return (
    <FormField
      control={form.control}
      name="listId"
      render={({ field }) => (
        <FormItem className="flex items-center">
          <FormLabel className="flex gap-3 min-w-[150px] max-w-[150px] pt-2">
            <FileBarChart2 className="h-4 w-4 opacity-50" />
            Status
          </FormLabel>
          {edit ? (
            <MoveToListSelect
              placeholder={selectedList?.name}
              boardId={boardId}
              selectedListId={listId}
              onSelect={field.onChange}
            />
          ) : (
            <p className="pl-4">{selectedList?.name}</p>
          )}
        </FormItem>
      )}
    />
  );
};

const FormDate = () => {
  const { form, edit } = useContext(FormContext);

  return (
    <FormField
      control={form.control}
      name="dueDate"
      render={({ field }) => (
        <FormItem className="flex items-center">
          <FormLabel className="flex gap-3 min-w-[150px] max-w-[150px] pt-2">
            <CalendarIcon className="h-4 w-4 opacity-50" />
            Due date
          </FormLabel>
          <Popover>
            {edit ? (
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={`${cn(
                      "w-full text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )} justify-start`}
                  >
                    {field.value ? (
                      strDateFormat(field.value)
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </FormControl>
              </PopoverTrigger>
            ) : (
              <p className="pl-4">{strDateFormat(field.value)}</p>
            )}
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={new Date(field.value || "")}
                onSelect={(event) => field.onChange(event?.toISOString())}
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

const FormPriority = () => {
  const { form, edit } = useContext(FormContext);

  return (
    <FormField
      control={form.control}
      name="priority"
      render={({ field }) => (
        <FormItem className="flex items-center">
          <FormLabel className="flex gap-3 max-w-[150px] min-w-[150px] items-center pt-2">
            <BarChart className="opacity-50" />
            Priority
          </FormLabel>
          {edit ? (
            <Select {...field} onValueChange={field.onChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Object.values(TaskPriority).map((priority) => (
                    <SelectItem key={priority} value={priority}>
                      {priority.toLocaleLowerCase()}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          ) : (
            <p className="pl-4">{field.value}</p>
          )}
        </FormItem>
      )}
    />
  );
};

const FormDescription = () => {
  const { form, edit } = useContext(FormContext);

  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem className="pt-5">
          <FormLabel className="text-2xl font-semibold tracking-tight">
            Description
          </FormLabel>
          {edit ? (
            <Textarea placeholder="Description" {...field} rows={3} />
          ) : (
            <p className="pl-3 text-ellipsis break-words">{field.value}</p>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
