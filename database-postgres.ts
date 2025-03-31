import { randomUUID } from "node:crypto"
import { sql } from "./db"

interface Video {
    id?: string
    title: string
    description: string
    duration: number
}

export class DatabasePostgres {

    async list(search?: any) {
        let videos 

        if(search) {
            videos = await sql `select * from videos where title ilike ${"%" + search + "%"}`
        }

        else {
            videos = await sql `select * from videos`
        }

        return videos
    }


    async create(video: Video) {
        const videoId: string = randomUUID()
        const { title, description, duration } = video
        await  sql `insert into videos (id, title, description, duration) VALUES (${videoId}, ${title}, ${description}, ${duration})`
    }

    async update(id: string, video: Video) {
        const {title, description, duration} = video
        await sql`update videos set title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`       
    }

    async delete(id: string) {
        await sql `delete from videos where id = ${id}`
    }
}
