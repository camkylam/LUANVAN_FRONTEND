import createApiClient from "./api.service";

class districtsService {
  constructor(baseUrl = "/api/districts") {
    this.api = createApiClient(baseUrl);
  }
  async create(data) {
    return (await this.api.post(`/`, data)).data;
  }
  async getAll() {
    return (await this.api.get("/")).data;
  }
  async getOne(id) {
    return (await this.api.get(`${id}`)).data;
  }
  async findAllDepOfACty(ctyId) {
    return (await this.api.get(`/cty/${ctyId}`)).data;
  }
  async update(id, data) {
    return (await this.api.post(`/${id}`, data)).data;
  }
  async deleteAll() {
    return (await this.api.delete("/")).data;
  }
  async findIdByName(data){
    return (await this.api.post(`/district/name/`, data)).data
  }
  async deleteOne(id) {
    return (await this.api.delete(`/${id}`)).data;
  }
  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }
}

export default new districtsService();