//@flow
import React, { Component } from "react"
import CountryElement from "./country_element"
import { feature } from "topojson-client"
import { connect } from "react-redux"
import { getCountryBoundries } from "../actions/index"

type Props = {
  onGetCountryBoundries: Function,
  countrySelect: Function,
  country: Object,
  map: Object
}

class Map extends Component<Props, *> {

  selectCountry: Function

  constructor() {
    super()

    this.selectCountry = this.selectCountry.bind(this) 
  }

  componentDidMount() {
    this.props.onGetCountryBoundries()
  }

  selectCountry(e: SyntheticEvent<*>){
    this.props.countrySelect(e.currentTarget.getAttribute('id'))
  }

  render() {
    const worldData = this.props.map.objects ? feature(this.props.map, this.props.map.objects.countries).features : []
    return (
      <div className="scaling-svg-container">
        <svg className="scaling-svg" viewport="0 0 800 600" preserveAspectRatio="none">
          <g className="countries">
            { worldData.map((country,i) => (
              <CountryElement
                key={`country-${i}`}
                country={country} 
                idx={i} 
                count={worldData.length}
                selected={ this.props.country && this.props.country.numericCode === country.id } 
                selectCountry={this.selectCountry} />
              )) }
          </g>
        </svg>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    map: state.map
  }
}

const mapActionsToProps = {
  onGetCountryBoundries: getCountryBoundries 
}

export default connect(mapStateToProps, mapActionsToProps)(Map)