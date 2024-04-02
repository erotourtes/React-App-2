import { MaxLength } from "class-validator";

export class CreateBoardDto {
  @MaxLength(128)
  name: string;
}
