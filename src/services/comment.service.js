import createApiClient from "./api.service";

class EventService {
    constructor(baseUrl = "/api/comment") {
        this.api = createApiClient(baseUrl);
    }
    async create(data) {
        return (await this.api.post("/", data)).data;
    }
    async getByPartymember(id) {
        return (await this.api.get(`/partymember/${id}/`)).data
    }
    async getById(id) {
        return (await this.api.get(`/comment/${id}/`)).data
    }
    async getByYear(year){
        return (await this.api.get(`/${year}`)).data
    }
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }
    async update(data) {
        return (await this.api.put("/", data)).data;
    }
    async getByOpinionId(data) {
        return (await this.api.post("/comment/name", data)).data;
    }
    async getByYearAndPartyCell(data) {
        return (await this.api.post("/comment/status/partycell", data)).data;
    }
    async getByYearAndPartyCellExemptionTrue(data) {
        return (await this.api.post("/comment/status/partycell/expemtion/true/id", data)).data;
    }
    async getByYearAndPartyCellExemptionFalse(data) {
        return (await this.api.post("/comment/status/partycell/expemtion/false/id/id", data)).data;
    }
    async getByYearAndPartyCellAndMeet(data){
        return (await this.api.post("/comment/status/partycell/meet/id", data)).data;
    }
}

export default new EventService();