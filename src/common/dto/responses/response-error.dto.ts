export class ErrorResponseDto {
  constructor(
    public code: number,
    public message: string,
    public details?: any,
  ) {}
}
