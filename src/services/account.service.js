import createApiClient from "./api.service";

class EventService {
    constructor(baseUrl = "/api/accounts") {
        this.api = createApiClient(baseUrl);
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
    async getEmailByRole(data) { // get all recommendation by hamletId and status
        return (await this.api.post(`/role`, data)).data
    }
    async getEmailByRoleHamlet(data) {
        return (await this.api.post('/role/hamlet', data)).data
    }
    async getEmailByRolePartyCell(data) {
        return (await this.api.post('/role/partycell', data)).data
    }
    async getEmailFromRoleAndWard(data) {
        return (await this.api.post('/role/hamlet/ward', data)).data
    }
}

export default new EventService();