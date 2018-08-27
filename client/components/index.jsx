//@flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { getCountryList, getCountryDetails } from "../actions/index"
import { find, propEq, last } from 'ramda'
import Map from './map'
import CountrySelector from './country_selector'
import CountryCard from './country_card'
import Intro from './intro'

type Props = {
  map: Array<Object>,
  details: Array<Object>,
  list: Array<Object>,
  onGetCountryList: Function,
  onGetCountryDetails: Function
}

type State = {
  selectedCountry: Object
}

class Index extends Component<Props, State> {
  countrySelect: Function

  constructor(props){
    super(props)
    this.state = {
      selectedCountry: {}
    }

    this.countrySelect = this.countrySelect.bind(this)
  }

  componentDidMount(){
    this.props.onGetCountryList()
  }

  static getDerivedStateFromProps(nextProps: Object, prevState: Object){
    if(last(nextProps.details) !== prevState.selectedCountry){
      return ({ selectedCountry: last(nextProps.details) })
    }
    return null
  }

  countrySelect(country: string){
    const countryList = this.props.list.length > 0 ? this.props.list : []
    const selected = find(propEq('numericCode', country))(countryList)
    this.props.onGetCountryDetails(selected.name)
  }

  render(){
    const renderMap = document.documentElement.clientWidth > 960
    return (
      <div>
        <Intro />
        <div className="flex flex-wrap app md:w-4/5">
          { renderMap ?
            <div className="-ml-16">
              <Map countrySelect={this.countrySelect} country={this.state.selectedCountry} />
            </div>
          : null }
          <div className="flex-1 h-88">
            <CountrySelector 
              country={this.state.selectedCountry} 
              countrySelect={this.countrySelect}
              countryList={this.props.list} />
            { this.state.selectedCountry ? <CountryCard country={this.state.selectedCountry}/> : null}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    map: state.map, 
    list: state.list, 
    details: state.details
  }
}

const mapActionsToProps = {
  onGetCountryList: getCountryList,
  onGetCountryDetails: getCountryDetails
}

export default connect(mapStateToProps, mapActionsToProps)(Index)