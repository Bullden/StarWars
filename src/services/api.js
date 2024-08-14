import Axios from 'axios'

const swApi = Axios.create({
  baseURL: 'https://sw-api.starnavi.io',
})

export const starWarsApi = {
  async getHeroes(param) {
    const response = await swApi.get(`/people${param ? `?${param}` : ''}`)
    return response.data
  },
  async getFilms(param) {
    const currentParam = param.join(',')
    const response = await swApi.get(`/films/${currentParam ? `?id__in=${currentParam}` : ''}`)
    return response.data
  },
  async getStarships(param) {
    const response = await swApi.get(`/starships/${param ? `?pilots=${param}` : ''}`)
    return response.data
  },
}
