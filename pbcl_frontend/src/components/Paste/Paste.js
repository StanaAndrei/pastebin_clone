import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Paste() {
    const { id } = useParams();
    const pasteURL = `http://localhost:8080/paste/${id}`;
    const updateURL = `http://localhost:8080/update/${id}`;
    const [paste, setPaste] = React.useState(null);
    const inpRef = React.createRef();
    const txtAreaRef = React.createRef();
    const [mess, setMess] = React.useState('');
    const [isBtnDis, setIsBtnDis] = React.useState(true);

    React.useEffect(() => {
        axios.get(pasteURL).then(res => {
            //console.log(res.data);
            setPaste(res.data);
        });
    }, [pasteURL]);

    if (!paste) {
        return <p>PASTE DOESN'T EXISTS!</p>;
    }

    const handleBtnClick = e => {
        e.preventDefault();
        setMess('Loading...');
        axios.put(updateURL, {
            id: -1,
            name: inpRef.current.value,
            content: txtAreaRef.current.value
        }).then(() => {
            setMess('Paste updated!');
            setIsBtnDis(true);
        }, error => {
            console.error(error);
            setMess('Error while updating the paste!');
        });
    }

    const handleChange = e => {
        setIsBtnDis(false);
    }

    return (
        <div className="Paste">
            <textarea onChange={handleChange} ref={inpRef} type="text">
                {paste.name}
            </textarea>
            <br />
            <br />
            <textarea onChange={handleChange} ref={txtAreaRef} rows="30" cols="100">
                {paste.content}
            </textarea>
            <br/>
            <button disabled={isBtnDis} onClick={handleBtnClick}>save</button>
            <br/>
            <i>{mess}</i>
        </div>
    );
}