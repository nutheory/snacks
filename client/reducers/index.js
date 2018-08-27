import { GET_MAP_SUCCESS, GET_LIST_SUCCESS, GET_DETAILS_SUCCESS } from '../actions/index'
import { combineReducers } from 'redux'

const map = (state = {}, {type, payload}) => {
  switch(type){
    case GET_MAP_SUCCESS:
      return payload.map 
    default: 
      return state   
  }
}

const countryList = (state = [], {type, payload}) => {
  switch(type){
    case GET_LIST_SUCCESS:
      return payload.list 
    default: 
      return state   
  }
}

const countryDetailsList = (state = [], {type, payload}) => {
  switch(type){
    case GET_DETAILS_SUCCESS: 
      return [...state, payload.details]
    default: 
      return state   
  }
}


const combinedReducers = combineReducers({
  map,
  countryList,
  countryDetailsList
})

export default combinedReducers