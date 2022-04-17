const Header = ({ course }) => <h1>{course.name}</h1>

const Total = ({ parts }) => {
  const totalEx =  parts.reduce((sum, part) => {
      return { exercises: sum.exercises + part.exercises }
  });

  return(
      <p style={{fontWeight: "bold"}}>
          total of { totalEx.exercises } exercises
      </p>
  )
}

const Parts = ({ course }) => {
  const parts = course.parts
  return (
    <>
      {parts.map(part =>
        <p key={part.id}>
          {part.name} {part.exercises}
        </p>
      )}
    </>
  )
}

const Content = ({ course }) => {
  return (
    <>
      <Parts course={course} />
      <p>total of  exercises</p>
    </>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header course={course} />
      <Content course={course} />
      <Total parts={course.parts} />
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course}/>
}

export default App