import { IsNotEmpty } from 'class-validator';

export default class CreateCommentDto {
  @IsNotEmpty()
  public text: string | undefined;
}