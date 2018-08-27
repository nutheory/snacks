import axios from 'axios'

export const CREATE_MAP = "country:createMap"
export const CREATE_LIST = "country:createList"
export const GET_DETAILS = "country:getDetails"

export const createMap = (map) => ({
  type: CREATE_MAP,
  payload: { map }
})

export const createList = (list) => ({
  type: CREATE_LIST,
  payload: { list }
})

export const getDetails = (details) => ({
  type: GET_DETAILS,
  payload: { details }
})


export const getCountryDetails = (countryName) => {
  const request = axios.get(`https://restcountries.eu/rest/v2/name/${countryName}?fullText=true`)
  return (dispatch) => {
    request.then(({ data, status }) => {
      if (status !== 200) {
        console.log(status)
      } else {
        dispatch(getDetails(data[0]))
      }
    })
  }
}

export const getCountryList = () => {
  const request = axios.get("https://restcountries.eu/rest/v2/all?fields=name;numericCode")
  return (dispatch) => {
    request.then(({ data, status }) => {
      if (status !== 200) {
        console.log(status)
      } else {
        dispatch(createList(data))
      }
    })
  }
}

export const getCountryBoundries = () => {
  const request = axios.get("/map")
  return (dispatch) => {
    request.then(({ data, status }) => {
      if (status !== 200) {
        console.log(status)
      } else {
        dispatch(createMap(data))
      }
    })
  }
}

