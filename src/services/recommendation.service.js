import createApiClient from "./api.service";

class EventService {
    constructor(baseUrl = "/api/recommendation") {
        this.api = createApiClient(baseUrl);
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async getAllByWard(data) { // get all recommendation by wardId and status
        return (await this.api.post(`/ward/`, data)).data
    }
    async getAllByStatusHamlet(data) { // get all recommendation by hamletId and status
        return (await this.api.post(`/hamlet/`, data)).data
    }
    async getAll(id) { // get all recommendations of member {ID}
        return (await this.api.get(`/${id}/all`)).data;
    }
    async getById(id) {
        return (await this.api.get(`/recommendation/${id}/`)).data
    }
    async get(id) { // get lastest recommendations of member {ID}
        return (await this.api.get(`/${id}`)).data;
    }
    async update(data) {
        return (await this.api.put("/", data)).data;
    }
    async getAllPartyMember(data){
        return (await this.api.post("/recommendation/partymember/id", data)).data
    }
    async getAllByStatusWithPartycell(data){
        return (await this.api.post(`/recommendation/status/partycell/id`, data)).data
    }
}

export default new EventService();