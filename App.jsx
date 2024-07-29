import React, { useCallback, useEffect, useState, useRef } from 'react';

function App() {

    const [length, setLength] = useState(8);
    const [numberAllowed, setNumberAllowed] = useState(false);
    const [charAllowed, setCharAllowed] = useState(false);
    const [password, setPassword] = useState("");

    const passwordRef = useRef(null);

    const passwordGenerator = useCallback(() => {
        let pass = "";
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

        if(numberAllowed){
            str += "0123456789";
        }
        if(charAllowed){
            str += "?/<>,.:;_-\|/!@#$%^&*()~";
        }

        for(let i = 1; i <= length; i++){
            let char = Math.floor(Math.random() * str.length + 1);
            pass += str.charAt(char);
        }

        setPassword(pass);

    }, [length, numberAllowed, charAllowed, setPassword]);

    useEffect(() => {
        passwordGenerator();
    }, [length, numberAllowed, charAllowed, passwordGenerator]);

    const copyPasswordToClipboard = useCallback(() => {
        passwordRef.current?.select();                      //for highlighting/selecting the copied portion
        window.navigator.clipboard.writeText(password);
    }, [password]); 

    return(
        <>
            <div>
                <h1>Password Generator</h1>
                <div>
                    <input
                        type="text"
                        value={password}
                        placeholder='password'
                        readOnly
                        ref={passwordRef}
                    />
                    <button onClick={copyPasswordToClipboard}>Copy</button>
                </div>
                <div>
                    <div>
                        <input
                            type="range"
                            min={6}
                            max={50}
                            value={length}
                            onChange={(e) => {setLength(e.target.value)}}
                        />
                        <label>Length: {length}</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            defaultChecked={numberAllowed}
                            id="numberInput"
                            onChange={() => {setNumberAllowed((prev) => !prev);}}
                        />
                        <label>Numbers</label>
                    </div>
                    <div>
                        <input
                            type="checkbox"
                            defaultChecked={charAllowed}
                            id="charInput"
                            onChange={() => {setCharAllowed((prev) => !prev);}}
                        />
                        <label>Characters</label>
                    </div>
                </div>
            </div>
        </>
    );
}

export default App;
