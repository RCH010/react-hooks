// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

/**
 * @function useLocalStorageState
 * @description custom hook to keep state and localstorage updated
 * @param {String} key identifier for localstorage
 * @param {any} defaultValue Default value to start the state (can be a function)
 * @param {Object} options 
 * @param {function} options.serialize default is JSON.stringify, function to serialize the value which will be stored
 * @param {function} options.deserialize default is JSON.parse, function to deserialize the value which will be stored
 * @returns {Array<[any, function]>}
 */
const useLocalStorageState = (
  key,
  defaultValue = '', 
  {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
  } = {}
) => {
  const [value, setValue] = React.useState(() => {
    const valueFromStorage = localStorage.getItem(key)
    if (valueFromStorage) {
      return deserialize(valueFromStorage)
    }
    return typeof defaultValue === 'function'? defaultValue() : defaultValue
  });

  const setLocalStorage = (newValue) => {
    setValue(newValue)
    localStorage.setItem(key, serialize(newValue))
  }

  return [value, setLocalStorage]
}


function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)
  // 🐨 initialize the state to the value from localStorage
  // 💰 window.localStorage.getItem('name') || initialName
  // // const [name, setName] = React.useState(() => localStorage.getItem('name') || initialName)

  // // // 🐨 Here's where you'll use `React.useEffect`.
  // // // The callback should set the `name` in localStorage.
  // // // 💰 window.localStorage.setItem('name', name)
  // // React.useEffect(() => {
  // //   localStorage.setItem('name', name)
  // // }, [name]);

  function handleChange(event) {
    setName(event.target.value)
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
