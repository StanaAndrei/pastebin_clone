import React from "react";
import axios from "axios";
import PasteView from "../../components/PasteView/PasteView";
const baseUrl = 'http://localhost:8080/pastes';

export default function Pastes() {
    const [pastes, setPastes] = React.useState(null);

    React.useEffect(() => {
        axios.get(baseUrl).then(res => {
            setPastes(res.data.reverse());
        }, error => {
        });
    }, []);//*/

    if (!pastes) {
        return <p>Smth went wrong!</p>;
    }

    return (
        <div>
            {
                pastes.map(paste => <PasteView key={paste.id} id={paste.id} name={paste.name} />)
            }
        </div>
    );
}