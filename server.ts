import {fastify} from "fastify"
import { DatabasePostgres } from "./database-postgres"

const server: any = fastify()
const dataBase = new DatabasePostgres()

server.get("/videos", async(request: any , reply: any) => {

    const search = request.query.search
    const videos = await dataBase.list(search)
    return reply.status(200).send(videos)
})



server.post("/videos", async (request: any, reply: any) => {

    const { title, description, duration} = request.body
    await dataBase.create({title, description, duration})
    return reply.status(201).send({"message": "Video created"})
})



server.put("/videos/:id", async (request: any, reply: any) => {
    
    const videoId = request.params.id
    const {title, description, duration} = request.body
    await dataBase.update(videoId, {title, description, duration})
    return reply.status(200).send({"message": "Video updated"})
})



server.delete("/videos/:id",async (request: any, reply: any) => {
    const videoId = request.params.id
    await dataBase.delete(videoId)
    return reply.status(200).send({"message": "Video deleted"})
})



server.listen({ port: process.env.PORT || 3000, host: "0.0.0.0" }, (err: any, address: string) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})

