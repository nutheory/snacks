//@flow
import React, { Component } from "react"
import downArrow from '../assets/chevron-down.svg'
import searchIcon from '../assets/search-solid.svg'
import { head } from 'ramda'

type Props = {
  country: Object,
  countryList: Array<Object>,
  countrySelect: Function
}

type State = {
  dropdownActive: boolean,
  countryList: Array<Object>,
  country: Object
}

class CountryCard extends Component<Props, State>{

  toggleDropdown: Function
  handleSelection: Function
  filterCountries: Function

  constructor(props: Object){
    super(props)

    this.state = {
      dropdownActive: false,
      countryList: props.countryList,
      country: {}
    }

    this.toggleDropdown = this.toggleDropdown.bind(this)
    this.handleSelection = this.handleSelection.bind(this)
    this.filterCountries = this.filterCountries.bind(this)
  }

  toggleDropdown(){
    this.setState({ 
      dropdownActive: !this.state.dropdownActive, 
      countryList: this.props.countryList }, () => {
    })
  }

  static getDerivedStateFromProps(nextProps: Object, prevState: Object){
    if(nextProps.country !== prevState.country){
      return ({ country: nextProps.country, dropdownActive: false })
    }
    return null
  }

  handleSelection(e: SyntheticEvent<*>){
    this.props.countrySelect(e.currentTarget.getAttribute('id'))
    this.toggleDropdown()
  }

  filterCountries(e: SyntheticEvent<*>){
    const name = e.currentTarget.value
    this.setState({ countryList: this.props.countryList.filter(li => li.name.toLowerCase().startsWith(name.toLowerCase())) })
  }

  render(){
    const details = this.props.country
    return (
      <div> 
        <div className="w-4/5">
          <div className="relative mb-8">
            <div className="flex dropdown" onClick={ this.toggleDropdown }>
              {this.state.dropdownActive ? 
                <div className="flex-1">
                  <div>
                    <div className="search-wrapper" onClick={e => e.stopPropagation()}>
                      <input type="text" onChange={ this.filterCountries } ></input>
                      <div className="search-icon"><img src={searchIcon} alt="Filter countries" /></div> 
                    </div>
                  </div>
                </div>
              : <div className="flex-1">{ details ?
                  <div className="flex flex-1">
                    <div className="w-24 flex items-center pr-6">
                      <img 
                        src={details.flag} 
                        alt={ `${details.name}'s flag` }
                        className="flag" />
                    </div>
                    <h2 className={`title t-shadow ${details.name.length > 18 ? 'text-2xl': ''}`}>{ details.name }</h2>
                  </div>
                : <div className="title t-shadow flex-1">Select a Country</div> }
              </div> }
              <div className="flex items-center"><img src={`/${downArrow}`} className="w-10 h-10" /></div>
            </div>
            <div className={ `${this.state.dropdownActive ? 'block' : 'hidden'} dropdown-options`}>
              <ul className={ `list-reset px-2 overflow-y-scroll h-full`}>
                { this.state.countryList ? this.state.countryList.map((cl, i) => (
                  <li 
                    id={cl.numericCode}
                    key={`country-${i}`} 
                    onClick={ this.handleSelection }
                    className="text-xl py-1 px-2 hover:bg-grey-darker hover:cursor-pointer t-shadow">{cl.name}</li>
                )) : null }
              </ul>
            </div>
          </div>
          { details ?
            <div className="w-full">
              <div className="flex flex-wrap mb-6">
                <div className="flex-1">
                  <h4>Region</h4>
                  <p className="country-data">{ details.region }</p>
                </div>
                <div className="flex-1">
                  <h4>Capital city</h4>
                  <p className="country-data">{ details.capital }</p>
                </div>
              </div>
              <div className="flex flex-wrap mb-6">
                <div className="flex-1">
                  <h4>Population</h4>
                  <p className="country-data">{ details.population.toLocaleString() }</p>
                </div>
                <div className="flex-1">
                  <h4>Demonym</h4>
                  <p className="country-data">{ details.demonym }</p>
                </div>
              </div>
              <div className="flex flex-wrap mb-6">
                <div className="flex-1">
                  <h4>Currency</h4>
                  <p className="country-data">{ head(details.currencies).name }</p>
                </div>
              </div>
            </div>
          : null }
        </div>
      </div>
    )
  }
}

export default CountryCard