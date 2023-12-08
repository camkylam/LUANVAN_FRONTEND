import createApiClient from "./api.service";

class EventService {
    constructor(baseUrl = "/api/opinion") {
        this.api = createApiClient(baseUrl);
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async getByPartymember(id) {
        return (await this.api.get(`/partymember/${id}/`)).data
    }
    async getById(id) {
        return (await this.api.get(`/opinion/${id}/`)).data
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    async update(data) {
        return (await this.api.put("/", data)).data;
    }
    async getAllOpinionsByRecommendation(data) {
        return (await this.api.post("/opinion/recommendation", data)).data;
    }
}

export default new EventService();