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

  const request = await axios.post(baseUrl, newObject, config)
  return request.data
}

const edit = async (likes, blogId) => {
  const request = await axios.put(baseUrl + "/" + blogId, { likes });
  return request.data;
};

const remove = async (blogId) => {
  const config = {
    headers: { Authorization: token },
  };
  const res = await axios.delete(baseUrl + "/" + blogId, config);
  return res.data;
};


export default { getAll, create, setToken, edit, remove }

