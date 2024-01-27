import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {

  const [pass, setPass] = useState("");
  const [nums, setNums] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [len, setLen] = useState(8);

  const passwordRef = useRef(null);

  const passwordGen = useCallback(() => {
    let newPass = "";
    let string = "qwertyuiopasdfghjklzxcvbnmQWERTYUIOPLKJHGFDSAZXCVBNM";
    if (nums) {
      string += "1234567890";
    }
    if (specialChar) {
      string += "!@#$%^&*()_+~";
    }
    for (let i = 1; i <= len; i++) {
      let index = Math.floor((Math.random() * string.length) + 1);
      let char = string.charAt(index);
      newPass += char;
    }
    // console.log(newPass);
    setPass(newPass)
  }, [specialChar, len, nums, setPass]);

  const copyToClipboard = (() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(pass);
  })

  useEffect(() => {
    passwordGen()
  }, [len, nums, specialChar, passwordGen])


  return (
    <>
      <h1>Password Generator</h1>
      <div id='back'>
        <div>
          <input type="text" id='text' placeholder='Password' value={pass} readOnly ref={passwordRef} />
          <button id='button' onClick={copyToClipboard}>COPY</button>
        </div>
        <div id='properties'>
          <label>Length ({len})</label>
          <input type="range" min={0} max={30} value={len} onChange={(e) => { setLen(e.target.value) }} />

          <label htmlFor='numbers'>Numbers</label>
          <input type="checkbox" id='numbers' onClick={() => setNums((prev) => (!prev))} />

          <label htmlFor='special'>Special Characters</label>
          <input type="checkbox" id='special' onClick={() => setSpecialChar((prev) => (!prev))} />
        </div>
      </div>
    </>
  )
}

export default App
