import { CREATE_MAP, CREATE_LIST, UPDATE_DETAILS } from '../actions/index'
import { combineReducers } from 'redux'

const initCountryDetail = []

const mapReducer = (state = {}, {type, payload}) => {
  switch(type){
    case CREATE_MAP:
      return payload.map 
    default: 
      return state   
  }
}

const countriesReducer = (state = [], {type, payload}) => {
  switch(type){
    case CREATE_LIST:
      return payload.list 
    default: 
      return state   
  }
}

const countryReducer = (state = [], {type, payload}) => {
  switch(type){
    case UPDATE_DETAILS: 
      return [...state, payload.details]
    default: 
      return state   
  }
}


const combinedReducers = combineReducers({
  map: mapReducer,
  list: countriesReducer,
  details: countryReducer
})

export default combinedReducers