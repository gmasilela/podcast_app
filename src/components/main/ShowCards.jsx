//ShowCards.jsx
import './ShowCards.css'
import genres from '../../data/genreData'
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import { useState } from 'react';

export default function ShowCards(props) {

    const [showDescription, setShowDescription] = useState(false)

    function toggleShowDescription() {
        setShowDescription(
            (prev) => !prev
        )
    } 

    function findGenre(podcastGenres) {
        const podcast = podcastGenres.map((genreNum) => {
            const foundGenre = genres.find((genre) => genre.id === genreNum);
            return (
                <span key={genreNum}>
                    {foundGenre ? foundGenre.genre : "Unknown Genre"}
                </span>
            );
        })

        return podcast
    }

    const [imageError, setImageError] = useState(false);

    const handleImageError = () => {
      setImageError(true);
    };

    //Time stamp to change into Lat updated into yy/mm/dd
    function formatTimestamp(timestamp) {
        const date = new Date(timestamp);
        const formattedDate = `${date.getUTCDate().toString().padStart(2, '0')}${(date.getUTCMonth() + 1).toString().padStart(2, '0')}//${date.getUTCFullYear().toString().slice(2)}`;
        return formattedDate;
      }
    return (
        <Card className='custom-card'>
            {imageError ? 
                (
                <div className='image-block'>
                    <Spinner animation='border" role="status'>
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
                ): 
                (
                    <Card.Img
                        variant='top'
                        src={props.image}
                        id={props.id}
                        onError={handleImageError}
                        onClick = {props.handleClick}
                        loading='lazy'
                    />
                ) 
            }

            <Card.Body>
                <div className='podcast_show_info'>
                    <div className='info-container'>
                        <span>S{props.numOfSeasons}</span>
                        <button onClick = {toggleShowDescription}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="white" className="bi bi-info-circle-fill" viewBox="0 0 16 16">
                                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm.93 5.742a.93.93 0 1 1-1.86 0 .93.93 0 0 1 1.86 0zM8 10a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                            </svg>
                        </button>
                    </div>
                    <div className='genre' 
                        style= {{   fontSize: '14px',
                            display: 'inline-block'}}
                    >
                        {findGenre(props.genres)}
                    </div>
                    <div className="card-text">
                        <small className="text-body-secondary" style={{color: 'white'}}>Last updated {formatTimestamp(props.updated)}</small>
                    </div>
                    {
                        showDescription && <span>Description: {props.description}</span>
                        }
                </div>
            </Card.Body>
        </Card>
    )
}