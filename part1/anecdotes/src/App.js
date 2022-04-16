import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [allVotes, setAllVotes] = useState(Array(anecdotes.length).fill(0))
  let maxVote = 0

  const handleNextClick = () => {
    let index = () => Math.floor(Math.random() * anecdotes.length)
    setSelected(index)
  }

  const handleVoteClick = () => {
    const copyAllVotes = [...allVotes]
    copyAllVotes[selected] += 1
    setAllVotes(copyAllVotes)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}<br></br>
      has {allVotes[selected]} votes<br></br>
      <Button handleClick={handleVoteClick} text='vote' />
      <Button handleClick={handleNextClick} text='next anecdote' />
      <h1>Anecdote with the most votes</h1>
      {anecdotes[allVotes.indexOf(Math.max(...allVotes))]}<br></br>
      has {allVotes[allVotes.indexOf(Math.max(...allVotes))]} votes<br></br>
    </div>
  )
}

export default App