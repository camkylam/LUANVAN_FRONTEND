import createApiClient from "./api.service";

class EventService {
    constructor(baseUrl = "/api/criterion") {
        this.api = createApiClient(baseUrl);
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async getAllByWard(data) { // get all recommendation by wardId and status
        return (await this.api.post(`/ward/`, data)).data
    }
    async getAll(exemption) { // get all recommendation by hamletId and status
        return (await this.api.get(`/exemption/${exemption}`)).data
    }
    async get(id) { // get lastest recommendations of member {ID}
        return (await this.api.get(`/${id}`)).data;
    }
    async update(data) {
        return (await this.api.put("/", data)).data;
    }
}

export default new EventService();