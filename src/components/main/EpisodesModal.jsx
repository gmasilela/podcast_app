//EpisodesModal.jsx
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState, useEffect, useRef } from 'react';
import supabase from '../../config/supabaseClient';
import formatDateTime from '../../tools/formatDateTime';

function AudioPlayer({ audioFile, playAudio }) {
    const audioRef = useRef(null);

    useEffect(() => {
        if (playAudio) {
          audioRef.current.play();
        } else {
          audioRef.current.pause();
        }
      }, [playAudio]);
    
      return (
        <audio ref={audioRef} controls>
          <source src={audioFile} type="audio/mpeg" />
        </audio>
      );
    }
    

export default function EpisodesModal({ show, handleClose, selectedSeasonData, seasons, selectedSeason, showTitle, updated }) {

    const [selectSeason, setSelectSeason] = useState(selectedSeason);
    const [favorites, setFavorites] = useState({});
    const [favoriteEpisode, addFavoriteEpisode] = useState([]);
    const [playAudio, setPlayAudio] = useState(false);

    function handleSeasonClick(seasonNumber) {
        setSelectSeason(seasonNumber);
        setPlayAudio(false);
    }

    useEffect(() => {
        if (favoriteEpisode.length > 0) {
            saveFavoritesToSupabase();
        }
    }, [favoriteEpisode]);

    if (!selectedSeasonData) return null;

    function togggleFavourite(episodeId) {
        setFavorites(prevFavorites => {
            const isCurrentlyFavorited = prevFavorites[episodeId];
    
            if (isCurrentlyFavorited) {
                return prevFavorites;
            }

            const updatedFavorites = {
                ...prevFavorites,
                [episodeId]: true,
            };
    
            const episodeDetails = selectedSeasonData.episodes.find(
                episode => episode.episode === episodeId
            );

            const moreDetailAboutEpisode = {
                ...episodeDetails,
                season: selectSeason,
                addedDateTime:  formatDateTime(new Date().toISOString()),
                showName: showTitle,
                lastUpdate: updated
            };
            // Store the latest favorite episode object
            addFavoriteEpisode(prevEpisodes => [{...moreDetailAboutEpisode}]);

            return updatedFavorites;
        });
    }

    console.log(favoriteEpisode)

    function MappingOverEpisodes({data}) {
        const episodeStore = data.episodes.map((episodeData) => {

            const episodeId = episodeData.episode;

            const hollowHeart = (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-heart-fill" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                </svg>
            )
            const fillHeart = (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" className="bi bi-heart" viewBox="0 0 16 16">
                    <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
                </svg>
            )
            const favoriteIcon = favorites[episodeId] ? (
                <span onClick={() => togggleFavourite(episodeId)}>
                    {hollowHeart}
                </span>
            ) : (
                <span onClick={() => togggleFavourite(episodeId)}>
                    {fillHeart}
                </span>
            );

            return (
                <div className='episode_data' key={episodeData.episode}>
                <Card body>
                    <div 
                        className='card-header' 
                        style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center' 
                        }}
                    >
                        <h4>Episode: {episodeData.episode}</h4>
                        <div className='favourite-episode'>
                            {favoriteIcon}
                        </div>
                    </div>
                    <h5>{episodeData.title}</h5>
                    <p>Description: {episodeData.description}</p>
                    <AudioPlayer
                        audioFile = {episodeData.file}
                        playAudio={playAudio}
                    />
                </Card>
                </div>
            );
        });
        return episodeStore;
    }

    async function saveFavoritesToSupabase() {
        try {
            const { data, error } = await supabase.from('favorite').upsert(
                [...favoriteEpisode]);

            if (error) {
                console.error('Error saving favorites to Supabase:', error.message);
            } else {
                console.log('Favorites saved successfully:', data);
            }
        } catch (error) {
            console.error('Error saving favorites:', error.message);
        }
    }
    
    return (
        <Modal 
            show={show} 
            onHide={handleClose} 
            keyboard={false}
            
        >
            <Modal.Header >
            <div className="card mb-3" style={{maxHeight: '100px'}}>
                <div className="row g-0">
                    <div className="card text-bg-dark">
                        <img src={selectedSeasonData.image} className="card-img"/>
                    <div className="card-img-overlay" >
                        <h2 className="card-title">{showTitle}</h2>
                    </div>
                </div>       
            </div>
            </div>
            </Modal.Header>
            <Modal.Body>
                {
                    seasons.map((season) => (
                        <Button
                            key={season.season}
                            onClick={() => handleSeasonClick(season.season)}
                            variant={selectSeason === season.season ? "primary" : "outline-primary"}
                        >
                        S{season.season}
                        </Button>
                    )
                )
                    }
                {
                    selectSeason && (
                        <MappingOverEpisodes 
                            data={seasons.find((seasonData) => seasonData.season === selectSeason)}
                        />
                    )
                }
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}