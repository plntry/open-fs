import { useState, useEffect } from 'react'
import personService from './services/persons'
import Filter from './components/Filter'
import Person from './components/Person'
import NewPersonForm from './components/NewPersonForm'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [message, setMessage] = useState(null)

  const hook = () => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }

  useEffect(hook, [])

  const removePersonOf = (id) => {
    const person = persons.find(p => p.id === id)
    const answer = window.confirm(`Delete ${person.name}?`)

    if (answer) {
      personService
        .remove(id)
        .then(response => {
          setPersons(personsToShow.filter(p => p !== person))
          setMessage({
            text: `${person.name} has removed`,
            type: "success",
          })
        })
        .catch((error) => {
          alert(
            `the person '${person.name}' was already deleted from server`
            )
            setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  const addNew = (event) => {
    event.preventDefault()

    const nameObject = {
      name: newName,
      number: newNumber
    }
    
    if (!(persons.some((person) => person.name === newName))) {
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')

          setMessage(
            `Added ${returnedPerson.name}`
          )
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      
    } else {
      const answer = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (answer) {
        const person = persons.find(p => p.name === nameObject.name)
        const changedPerson = { ...person, number: newNumber }

        personService
          .update(person.id, changedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
            
            setMessage(
              `Edited ${returnedPerson.name}'s number`
            )
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
          .catch(error => {
            alert(
              `the number '${person.number}' was already deleted from server`
              )
              setPersons(persons.filter(p => p.id !== changedPerson.id))
          })
      }

    }
        
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
      <Notification message={message} />
      <Filter onChange={handleFilterChange} />
      <h2>add a new</h2>
      <NewPersonForm onSubmit={addNew}
        valueName={newName} onChangeName={handleNameChange}
        valueNumber={newNumber} onChangeNumber={handleNumberChange}
      />
      <h2>Numbers</h2>
      {personsToShow.map(person => 
        <Person
          key={person.id}
          person={person}
          removePerson={() => removePersonOf(person.id)}
        />
      )}
    </div>
  )
}

export default App