import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  readonly email: string;

  @IsString()
  @Length(8)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsObject()
  @IsOptional()
  readonly preferences?: object;
}
