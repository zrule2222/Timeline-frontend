import axios from 'axios';
//import "babel-polyfill";
import router from '../router/index.js'

export const records = {}


records.http = axios.create({ baseURL: "http://127.0.0.1:5022/api" })

/* records.getAuthors = async function(value) {
  const res = await this.checkAuthentification()
  if(res != 500){
  let response = null
  if(value){
    response = await this.http.get(`/author/${value}`)
  }
  else{
    response = await this.http.get(`/authors`)
  }
    return response.data
}
  }
  records.getArticles = async function(value) {
    const res = await this.checkAuthentification()
    if(res != 500){
    let response = null
    if(value){
    response = await this.http.get(`/article/${value}`)
    }
    else{
      response = await this.http.get(`/articles`)
    }
    return response.data
  }
  }

  records.getArticlesByPage = async function(totalPages, limit, searchedValue) {
    const res = await this.checkAuthentification()
    if(res != 500){
    let response = null
    if(searchedValue){
    response = await this.http.get(`/articlePaginationSearch/${totalPages}/${limit}/${searchedValue}`)
    }
    else{
      response = await this.http.get(`/articlePagination/${totalPages}/${limit}`)
    }
    return response
  }
  }
  records.getArticlesByPageCount = async function(totalPages, limit, searchedValue) {
    const res = await this.checkAuthentification()
    if(res != 500){
    let response = null
    if(searchedValue){
    response = await this.http.get(`/articlePaginationSearchPages/${totalPages}/${limit}/${searchedValue}`)
    }
    else{
      response = await this.http.get(`/articlePaginationPages/${totalPages}/${limit}`)
    }
    return response
  }
  }
  records.deleteArticle = async function(id) {
    const res = await this.checkAuthentification()
    if(res != 500){
    await this.http.delete(`/article/${id}`)
    }
  }

  records.updateArticle = async function(id, title, content) {
    const res = await this.checkAuthentification()
  if(res != 500){
    await this.http.put(`/article/${id}`, {
      title: title,
      body: content,
    })
  }
  }
  */
  records.postRecord = async function(record) {
    console.log(record)
    const res = await this.checkAuthentification()
  if(res != 500){
    await this.http.post("/Records", record)
  }
  } 
  records.postImage = async function(image) {
    console.log(image[0])
    const res = await this.checkAuthentification()
  if(res != 500){
    await this.http.post("/Image", image)
  }
  } 
  records.login = async function(loginData) {
   return await this.http.post("/auth/login", loginData)
  }
  records.register = async function(registerData) {
    return await this.http.post("/auth/register", registerData)
   }
   records.logout = async function() {
    await this.http.post("/auth/logout","",{
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    })
    router.push({name:'Home', params:{message:"Loged out successfully"}})
   }
   records.checkAuthentification = async function() {
    try{
     await this.http.get("/auth/status", {
      headers: {
         Authorization: 'Bearer ' + localStorage.getItem('token'),
      }
    })
    return 200
  }
  catch(err){
    localStorage.setItem('messageToShow',"your session has expired")
    router.push({name:'Home', params:{message:"your session has expired"}})
    return 500
  }
   }

  export default{
    install(Vue){
      Vue.prototype.$records = records
    }
  }
