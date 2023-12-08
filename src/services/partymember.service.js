import createApiClient from "./api.service";

class EventService {
    constructor(baseUrl = "/api/partymembers") {
        this.api = createApiClient(baseUrl);
    }
    async getAllByCell(data) {
        return (await this.api.post("/cell", data)).data;
    }
    async getAll() {
        return (await this.api.get("/")).data;
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    async getOneFromBody(data) {
        return (await this.api.post("/email/id", data)).data;
    }
}

export default new EventService();