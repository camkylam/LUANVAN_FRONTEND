import createApiClient from "./api.service";

class hamletsService {
  constructor(baseUrl = "/api/hamlets") {
    this.api = createApiClient(baseUrl);
  }
  async create(data) {
    return (await this.api.post(`/`, data)).data;
  }
  async getAll() {
    return (await this.api.get("/")).data;
  }
  async getOne(id) {
    return (await this.api.get(`/${id}`)).data;
  }
  async findAllHamletOfWard(wardId) {
    return (await this.api.get(`/ward/${wardId}`)).data;
  }
  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }
  async deleteAll() {
    return (await this.api.delete("/")).data;
  }
  async deleteOne(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
  async findIdByName(data) { // get all recommendation by hamletId and status
    return (await this.api.post(`/hamlet/name`, data)).data
}
}

export default new hamletsService();