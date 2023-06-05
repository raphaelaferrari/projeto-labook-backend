import z, { string } from "zod"

export interface likeOrDislikPostInputDTO {
    postId: string,
    token: string,
    typeLike: boolean
}

export type likeOrDislikPostOutputDTO = undefined

export const likeOrDislikPostSchema = z.object({
    postId: z.string().min(1),
    token: z.string().min(10),
    typeLike: z.boolean()
}).transform(data => data as likeOrDislikPostInputDTO)