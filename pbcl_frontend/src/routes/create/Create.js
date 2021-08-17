import React from "react";
import axios from "axios";
const createURL = 'http://localhost:8080/create';
let firstTime = true;

export default function Create() {
    const [paste, setPaste] = React.useState(null);
    const inpRef = React.createRef();
    const txtAreaRef = React.createRef();
    const [mess, setMess] = React.useState('');

    React.useEffect(() => {
        if (firstTime) {
            firstTime = false;
            return;
        }
        if (!paste || !paste.name || !paste.content) {
            setMess('A field is empty!')
            return;
        }
        setMess('Loading...');
        axios.post(createURL, paste).then(res => {
            setMess('Paste created successfully!');
        }, error => {
            setMess('Error while creating paste!');
            console.error(error);
        });
    }, [paste])

    const handleBtnClick = e => {
        e.preventDefault();
        setPaste({
            id: -1, //id is given from db
            name: inpRef.current.value,
            content: txtAreaRef.current.value
        });
        inpRef.current.value = '';
        txtAreaRef.current.value = '';
    }

    return (
        <div className="Create">
            <input ref={inpRef} type="text" name="" placeholder="enter name of paste" />
            <br /><br />
            <textarea ref={txtAreaRef} rows="30" cols="100"></textarea>
            <br />
            <button onClick={handleBtnClick}>submit</button>
            <br />
            <i>{mess}</i>
        </div>
    );
}