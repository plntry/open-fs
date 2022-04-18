import { useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import NewPersonForm from './components/NewPersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567', id: 1 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [showAll, setShowAll] = useState(true)

  const addNew = (event) => {
    event.preventDefault()

    if (!(persons.some((el) => el.name === newName))) {
      const nameObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }

      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    } else
        alert(`${newName} is already added to phonebook`)
  } 

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNameFilter(event.target.value)
    setShowAll(false)
  }

  const personsToShow = showAll
    ? persons
    : persons.filter(person => {
    return person.name.toLowerCase().includes(nameFilter.toLowerCase())
    })

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange} />
      <h2>add a new</h2>
      <NewPersonForm onSubmit={addNew}
        valueName={newName} onChangeName={handleNameChange}
        valueNumber={newNumber} onChangeNumber={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} />
    </div>
  )
}

export default App