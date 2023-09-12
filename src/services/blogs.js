import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null;

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const edit = async (likes, blogId) => {
  const res = await axios.put(baseUrl + "/" + blogId, { likes });
  return res.data;
};

export default { getAll, create, setToken, edit }

