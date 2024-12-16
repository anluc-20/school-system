export type CustomResponse<Type> = {
  success: number
  message?: string
  data: Type[]
}