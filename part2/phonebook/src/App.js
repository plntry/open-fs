import { useState } from 'react'
import Name from './components/Name'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()

    if (!(persons.some((el) => el.name === newName))) {
      const nameObject = {
        name: newName
      }

      setPersons(persons.concat(nameObject))
      setNewName('')
    } else
        alert(`${newName} is already added to phonebook`)
  } 

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const checkName = (event) => {
    event.preventDefault()
    if (persons.includes(newName)) {
      alert('is already added to phonebook')
    } else
        return addName
  }

  return (
    <div>
      <div>debug: {newName}</div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person => 
        <Name key={person.name} person={person} />)}
    </div>
  )
}

export default App