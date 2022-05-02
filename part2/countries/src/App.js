import React, {useState, useEffect} from "react"
import axios from "axios"

const Filter = ( {onChange} ) => {
  return (
    <>
        find countries <input onChange={onChange} />
    </>
  )
}

const ReturnCountries = ( {countriesToShow} ) => {
  if (countriesToShow.length === 0) {
    return (
      <><p>Search for a country</p></>
    )
  } else if (countriesToShow.length > 10) {
    return (
      <><p>Too many matches, specify another filter</p></>
    )
  } else if (countriesToShow.length === 1) {
    return (
      <CountryInform country={countriesToShow[0]} />
    )
  } else {
      return (
          <CountriesList countriesToShow={countriesToShow} />
      )
    }
}

const CountryInform = ( {country} ) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <div>
        <p>capital {country.capital}</p>
        <p>area {country.area}</p>
      </div>
      <div>
        <h3>languages:</h3>
        <ul>
          {Object.entries(country.languages).map(([key, language]) =>
            <li key={key}>
              {language}
            </li>
          )}
        </ul>
      </div>
      <div>
        <img src={country.flags.png} width="30%" height="30%"/>
      </div>
    </>
  )
}

const CountriesList = ( {countriesToShow} ) => {
  return (
    <>
      {countriesToShow.map(country =>
        <div key={country.name.common}>
            <Country country={country} />
        </div>
        
      )}
    </>
  )
  
}

const Country = ( {country} ) => {
  const [buttonState, setButtonState] = useState(false)

  const handleClick = () => {
    setButtonState(!buttonState)
  }

  return (
    <>
      {country.name.common} <button onClick={handleClick}>show</button>
      {buttonState && <CountryInform country={country} />}
    </>
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchCountries, setSearchCountries] = useState('')
  const [showCountries, setShowCountries] = useState(true)

  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => setCountries(response.data))
  }
  useEffect(hook, [])

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setSearchCountries(event.target.value)
    setShowCountries(false)
  }

  const countriesToShow = showCountries
    ? []
    : countries.filter(country => {
      return country.name.common.toLowerCase().includes(searchCountries.toLowerCase())
  })

  return (
    <>
      <Filter onChange={handleSearchChange} />
      <ReturnCountries countriesToShow={countriesToShow} />


      
    </>
  )
}

export default App