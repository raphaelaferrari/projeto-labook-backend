import { PostDatabase } from "../database/PostDatabase";
import { CreatePostInputDTO, CreatePostOutputDTO } from "../dtos/posts/createPost.dto";
import { DeletePostInputDTO, DeletePostOutputDTO } from "../dtos/posts/deletePost.dto";
import { EditPostInputDTO, EditPostOutputDTO } from "../dtos/posts/editPost.dto";
import { GetPostInputDTO, GetPostOutputDTO } from "../dtos/posts/getPost.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { Post, PostModel } from "../models/Post";
import { USER_ROLES } from "../models/User";
import { IdGenerator } from "../services/idGenerator";
import { TokenManager } from "../services/tokenManager";

export class PostBusiness {

    constructor(
        private postDatabase: PostDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager
    ) { }

    public createPost = async (input: CreatePostInputDTO) => {
        const { content, token } = input

        const payload = this.tokenManager.getPayload(token)

        if (payload === null) {
            throw new BadRequestError("Token invalido")
        }

        const id = this.idGenerator.generate()

        const newPost = new Post(
            id,
            content,
            0,
            0,
            new Date().toISOString(),
            new Date().toISOString(),
            payload.id,
            payload.name
        )

        const newPostDB = newPost.toDBModel()
        await this.postDatabase.createPost(newPostDB)

        const output: CreatePostOutputDTO = undefined

        return output
    }

    public getPost = async (input: GetPostInputDTO): Promise<GetPostOutputDTO> => {
        const { token } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("Token invalido")
        }

        const postsDBName = await this.postDatabase.getPost()

        const posts = postsDBName.map((postName) => {
            const post = new Post(
                postName.id,
                postName.content,
                postName.likes,
                postName.dislikes,
                postName.created_at,
                postName.updated_at,
                postName.creator_id,
                postName.creator_name
            )

            return post.toBusinessModel()
        })
        const output: GetPostOutputDTO = posts

        return output
    }

    public editPost = async (input: EditPostInputDTO): Promise<PostModel> => {
        const { id, content, token } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("token inválido")
        }

        const searchPostDB = await this.postDatabase.searchPostId(id)

        if (!searchPostDB) {
            throw new BadRequestError("não existe post com esse id")
        }

        if (payload.id !== searchPostDB.creator_id) {
            throw new BadRequestError("somente quem criou o post pode editar")
        }

        const post = new Post(
            searchPostDB.id,
            searchPostDB.content,
            searchPostDB.likes,
            searchPostDB.dislikes,
            searchPostDB.created_at,
            searchPostDB.updated_at,
            searchPostDB.creator_id,
            payload.name
        )

        post.setContent(content)
        post.setUpdatedAt(new Date().toISOString())

        const editPostDB = post.toDBModel()
        await this.postDatabase.editPost(editPostDB)

        const output: EditPostOutputDTO = undefined

        return output
    }

    public deletePost = async (input: DeletePostInputDTO): Promise<DeletePostOutputDTO> => {
        const { id, token } = input

        const payload = this.tokenManager.getPayload(token)

        if (!payload) {
            throw new BadRequestError("token inválido")
        }

        const searchPostDB = await this.postDatabase.searchPostId(id)

        if (!searchPostDB) {
            throw new BadRequestError("não existe post com esse id")
        }

        if (payload.role === USER_ROLES.ADMIN) {

        } else if (payload.id !== searchPostDB.creator_id) {
            throw new BadRequestError("somente quem criou o post pode deletar")
        }

        await this.postDatabase.deletePost(id)

        const output: DeletePostOutputDTO = undefined

        return output

    }

    
}