import Priority from "@components/Priority.tsx";
import { TaskPriority } from "@packages/types";
import { render } from "@testing-library/react";

describe("Priority", () => {
  it("should render Priority", () => {
    const { getByText } = render(<Priority  priority={TaskPriority.MEDIUM}/>);

    const badge = getByText(TaskPriority.MEDIUM)

    expect(badge).toBeInTheDocument();
  });
})