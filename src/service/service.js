import axios from 'axios';
//import "babel-polyfill";
import router from '../router/index.js'

export const records = {}


records.http = axios.create({ baseURL: "http://127.0.0.1:5022/api" })

records.deleteImages = async function (id, images) {
  const res = await this.checkAuthentification()
  let response = null
  if (res != 500) {
    response = await this.http.post(`/ImageDelete/${id}`, images)
  }
  //return response.data
}
records.deletepoperties= async function (idArray) {
  console.log(idArray)
  const res = await this.checkAuthentification()
  let response = null
  if (res != 500) {
    response = await this.http.post(`/PropertyDelete`, idArray)
  }
  //return response.data
}
records.updateProperties = async function (id, property) {
  const res = await this.checkAuthentification()
  if (res != 500) {
    await this.http.put(`/Property/${id}`, property)
  }
}
records.deleteProperties = async function (id) {
  const res = await this.checkAuthentification()
  let response = null
  if (res != 500) {
    response = await this.http.delete(`/Properties/${id}`)
  }
  //return response.data
}
records.getProperties = async function (id) {

    let response = await this.http.get(`/Properties/${id}`)
    
  return response.data
}
records.postProperties = async function (properties, id) {
  const res = await this.checkAuthentification()
  let response = null
  if (res != 500) {
    response = await this.http.post(`/Properties/${id}`, properties)
  }
  return response.data
}
records.postQrCode = async function (id, url) {
  let formData = new FormData();
  formData.append('file', url);
  const res = await this.checkAuthentification()
  if (res != 500) {
    await this.http.post(`/QRcodes/${id}`, formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
  }
}
records.downloadQRCode = async function (url, label) {
  await axios.get(url, { responseType: 'blob' })
    .then(response => {
      const blob = new Blob([response.data], { type: 'application/png' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = label
      link.click()
      URL.revokeObjectURL(link.href)
    })
}
records.getAllVisibleRecords = async function () {
  //const res = await this.checkAuthentification()

  let response = await this.http.get(`/VisibleRecords`)

  return response.data
}
records.getRecordImages = async function (id) {
  //const res = await this.checkAuthentification()

  let response = await this.http.get(`/Image/${id}`)
  return response.data

}
records.deleteRecord = async function (id) {
  const res = await this.checkAuthentification()
  if (res != 500) {
    await this.http.delete(`/Record/${id}`)
  }
}
records.updateRecord = async function (id, record) {
  const res = await this.checkAuthentification()
  if (res != 500) {
    await this.http.put(`/Record/${id}`, record)
  }
}
records.changeVisibility = async function (id) {
  const res = await this.checkAuthentification()
  if (res != 500) {
    await this.http.put(`/VisibleStatus/${id}`)
  }
}
records.getRecords = async function () {
  const res = await this.checkAuthentification()
  let response = null
  if (res != 500) {
    response = await this.http.get(`/Records`)
  }
  return response.data
},
  records.getRecord = async function (id) {
    //const res = await this.checkAuthentification()
    let response = null
    //if(res != 500){
    response = await this.http.get(`/Record/${id}`)
    //}
    return response.data
  }
records.postRecord = async function (record) {
  const res = await this.checkAuthentification()
  let response = null
  if (res != 500) {
    response = await this.http.post("/Records", record)
  }
  return response.data
}
records.postImage = async function (id, image) {
  let formData = new FormData();
  for (let i = 0; i < image.length; i++) {
    for (let j = 0; j < image[i].length; j++) {
      formData.append('file', image[i][j]);
      console.log(image[0][j])

    }
  }
  //formData.append('file', image);
  const res = await this.checkAuthentification()
  if (res != 500) {
    await this.http.post(`/Image/${id}`, formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
  }
}
records.login = async function (loginData) {
  return await this.http.post("/auth/login", loginData)
}
records.register = async function (registerData) {
  return await this.http.post("/auth/register", registerData)
}
records.logout = async function () {
  await this.http.post("/auth/logout", "", {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }
  })
  router.push({ name: 'Home', params: { message: "Loged out successfully" } })
}
records.checkAuthentification = async function () {
  try {
    await this.http.get("/auth/status", {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    })
    return 200
  }
  catch (err) {
    localStorage.setItem('messageToShow', "your session has expired")
    router.push({ name: 'Login', params: { message: "You do not have a valid session. Please log in" } })
    return 500
  }
},
records.getUserData = async function () {
   let response = await this.http.get("/auth/status", {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    })
    return response.data
}
records.logout = async function() {
  await this.http.post("/auth/logout","",{
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    }
  })
  router.push({name:'Login', params:{message:"Loged out successfully"}})
 }

export default {
  install(Vue) {
    Vue.prototype.$records = records
  }
}
