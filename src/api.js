import axios from 'axios'
import Geocode from "react-geocode";

const Server = axios.create({
  baseURL: `http://localhost:8082/api`
})

const userExists = async email => {
  const {data} = await Server.get(`user/exists/email/${email}`)
  return data
}

const recipientExists = async (token, email) => {
  const {data} = await Server.get(`recipient/exists/email/${email}`,  {
    headers: {'Authorization': token}
  })
  return data
}

const signup = async user => {
  await Server.post('user/register', user)
}

const addRecipient = async (token, details) => {
  await Server.post('recipient', details, {
    headers: {'Authorization': token}
  })
}

const getRecipient = async (token, email) => {
  const {data} = await Server.get(`recipient/email/${email}`, {
    headers: {'Authorization': token}
  })
  return data
}

const validAddress = async (city, street, numOfBuilding) => {
  return true
}

const login = async (loginDetails) => {
  const {data} = await Server.post('auth/login', loginDetails)
  return data.access_token
}

const getUser = async (token, email) => {
  const {data} = await Server.get(`user/email/${email}`, {
    headers: {'Authorization': token}
  })
  return data
}

const getAllVolunteers = async token => {
  const {data} = await Server.get('user/volunteers', {
    headers: {'Authorization': token}
  })
  return data
}

const getAllDistributions = async token => {
  const {data} = await Server.get('distribution', {
    headers: {'Authorization': token}
  })
  return data
}

const getAllRecipients = async token => {
  const {data} = await Server.get('recipient', {
    headers: {'Authorization': token}
  })
  return data
}



const createDistributions = async (token, request) => {
  const {data} = await Server.post('divison', request, {
    headers: {'Authorization': token}
  })
  return data
}

const getLonLat = async (city, street, num) => {
  Geocode.setApiKey("AIzaSyBawvdy5HsVO7ASDbS468AkuFtzhahW5MA");
  Geocode.setLanguage("he");

  const data = await Geocode.fromAddress(`${street} ${num}, ${city}`)

  return data.results[0].geometry.location
}

const findClosestVolunteer = async (token, recipientEmail) => {
  const {data} = await Server.get(`divison/volunteer/${recipientEmail}`, {
    headers: {'Authorization': token}
  })
  return data
}

const saveDistributions = async (token, distributions) => {
  for(let i=0; i<distributions.length; i++) {
    await Server.post('distribution/save', distributions[i], {
      headers: {'Authorization': token}
    })
  }
}

const updateDistribution = async (token, distribution) => {
  await Server.put(`distribution/id/${distribution._id}`, distribution, {
    headers: {'Authorization': token}
  })
}

const newPost = async (token, post) => {
  await Server.post('blog', post, {
    headers: {'Authorization': token}
  })
}

const getPosts = async (token, email) => {
  const {data} = await Server.get(`blog/admin/${email}`, {
    headers: {'Authorization': token}
  })
  return data
}

const API = {
  userExists, signup, login, getUser, validAddress, 
  getAllVolunteers, getAllDistributions, getAllRecipients,
  createDistributions, getLonLat, recipientExists, addRecipient,
  findClosestVolunteer, saveDistributions, updateDistribution,
  getRecipient, newPost, getPosts
}

export default API