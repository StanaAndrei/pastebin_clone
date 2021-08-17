import axios from 'axios';
import './PasteView.css';

export default function PasteView({ name, id }) {
    const href = `/paste/${id}`;
    const deleteURL = `http://localhost:8080/delete/${id}`;
    const handleBtnClick = e => {
        e.preventDefault();
        axios.delete(deleteURL).then(() => {
            window.location.reload();
        }, error => {
            console.error(error);
            alert('Error while deleting paste!');
        })
    }

    return (
        <div className="PasteView">
            <a href={href}>{name}</a>
            <br/>
            <button onClick={handleBtnClick}>X</button>
        </div>
    );
}