export class ResponseDto {
  constructor(
    public code: number,
    public message: string,
    public details: any = [],
  ) {}
}
