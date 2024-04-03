import { MaxLength } from "class-validator";

export class CreateBoardDto {
  @MaxLength(128)
  name: string;
}

export class UpdateBoardDto {
  @MaxLength(128)
  name: string;
}

export type BoardT = {
  id: number;
  name: string;
};
