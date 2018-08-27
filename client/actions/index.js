import axios from 'axios'

export const GET_MAP_SUCCESS = "country:getMap"
export const GET_LIST_SUCCESS = "country:getList"
export const GET_DETAILS_SUCCESS = "country:getDetails"

export const getMap = (map) => ({
  type: GET_MAP_SUCCESS,
  payload: { map }
})

export const getList = (list) => ({
  type: GET_LIST_SUCCESS,
  payload: { list }
})

export const getDetails = (details) => ({
  type: GET_DETAILS_SUCCESS,
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
        dispatch(getList(data))
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
        dispatch(getMap(data))
      }
    })
  }
}

