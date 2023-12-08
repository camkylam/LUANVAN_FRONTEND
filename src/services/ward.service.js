import createApiClient from "./api.service";

class wardsService {
  constructor(baseUrl = "/api/wards") {
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
  async findAllWardsOfADep(depId) {
    return (await this.api.get(`/dep/${depId}`)).data;
  }
  async findIdByName(data) { // get all recommendation by hamletId and status
    return (await this.api.post(`/ward/name`, data)).data
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
}

export default new wardsService();