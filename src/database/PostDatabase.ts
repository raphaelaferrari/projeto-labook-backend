import { PostDB, PostDBCreatorName } from "../models/Post";
import { BaseDatabase } from "./BaseDatabase";
import { UserDatabase } from "./UserDatabase";

export class PostDatabase extends BaseDatabase {
    public static TABLE_POSTS = "posts"
    public static TABLE_TYPE_LIKES = "likes_dislikes"

    public async createPost (createPost : PostDB) : Promise<void>{

        const result : PostDB = await BaseDatabase.connection(PostDatabase.TABLE_POSTS).insert(createPost);
    }

    public getPost =async () :  Promise<PostDBCreatorName[]> => {
        const result = await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
        .select(
            `${PostDatabase.TABLE_POSTS}.id`,
            `${PostDatabase.TABLE_POSTS}.content`,
            `${PostDatabase.TABLE_POSTS}.creator_id`,
            `${PostDatabase.TABLE_POSTS}.likes`,
            `${PostDatabase.TABLE_POSTS}.dislikes`,
            `${PostDatabase.TABLE_POSTS}.created_at`,
            `${PostDatabase.TABLE_POSTS}.updated_at`,
            `${UserDatabase.TABLE_NAME}.name as creator_name`
        )
        .join(
            `${UserDatabase.TABLE_NAME}`,
            `${PostDatabase.TABLE_POSTS}.creator_id`,
            "=",
            `${UserDatabase.TABLE_NAME}.id`,

        )

        return result as PostDBCreatorName[]
    }

    public searchPostId =async (id: string) : Promise<PostDB> => {
        const [result] = await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
        .select()
        .where({id})

        return result as PostDB | undefined
    }

    public editPost =async (postDb: PostDB) : Promise<void>=> {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
        .update(postDb)
        .where({id: postDb.id})
    }

    public deletePost =async (id: string) : Promise<void> => {
        await BaseDatabase.connection(PostDatabase.TABLE_POSTS)
        .delete()
        .where({ id })
    }

}