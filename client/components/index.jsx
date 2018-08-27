//@flow
import React, { Component } from "react"
import { connect } from "react-redux"
import { getCountryList, getCountryDetails } from "../actions/index"
import { find, propEq, last } from 'ramda'
import Map from './map'
import CountryCard from './country_card'
import me from '../assets/headshot.png'
import github from '../assets/github.svg'
import phoenix from '../assets/phoenix.svg'

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
    return (
      <div>
        <div className="flex flex-wrap w-4/5 mx-auto my-12">
          <div className="flex flex-wrap flex-1 mr-8 text-sm md:text-xl leading-normal t-shadow">
            <div className="flex">
              <div className="">
                <img src={`/${me}`} className=" rounded-full border-grey-darker border-4 bolder-solid mr-4 float-left w-20" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="title ">Derek Rush <span style={{fontSize: '1.6rem'}}>Assessment</span></h2>
              <div className="flex">
                <div className="mr-8">

                </div>
                <div className="">

                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 t-shadow">
            <h2 className="title">Notes</h2>
            <ul>
              <li className="py-4">Initial GET request retrieves a list of all countries with only two fields 
              "numericCode" and "name". Numeric code is used to link the map to the country name 
              and the names are used to populate the dropdown component.</li>
              <li></li>

            </ul>
          </div>
        </div>
        <div className="flex flex-wrap bottom-half">
          <div className="flex-1">
            <Map countrySelect={this.countrySelect} country={this.state.selectedCountry} />
          </div>
          <div className="flex-1">
            { this.props.details ? 
              <CountryCard 
                country={this.state.selectedCountry}
                countrySelect={this.countrySelect}
                countryList={this.props.list}
                /> : null}
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