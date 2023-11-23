//FewtchFavouriteEpi.jsx
import supabase from "../../config/supabaseClient";
import { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CustomShowArrangement from "../sidebar/CustomShowArrangement";
import Accordion from 'react-bootstrap/Accordion'


export default function FetchFavouriteEpisode(props) {
    const [favEpisode, setFavEpisode] = useState(null)
    const [fetchError, setFetchError] =useState(null)

    useEffect(() => {
        const fetchFavEpisode = async () => {
            try {
                const { data, error } = await supabase
                    .from('favorite')
                    .select();


                if (error) {
                    setFetchError('Could not fetch the Episodes');
                    setFavEpisode(null);
                }
                if (data) {
                    setFavEpisode(data);
                    setFetchError(null);
                }
            } catch (error) {
                setFetchError('An error occurred while fetching data');
            }
        };


        fetchFavEpisode();
    }, [])


    console.log(favEpisode)

    const toggleFavorite = async (episodeId) => {
        try {
            const isFavorite = favEpisode.some((epi) => epi.id === episodeId);

            if (isFavorite) {
                const { error } = await supabase
                    .from('favorite')
                    .delete()
                    .eq('id', episodeId);
                if (error) {
                    console.error('Error removing favorite:', error);
                } setFavEpisode((prevFavs) =>
                prevFavs.filter((epi) => epi.id !== episodeId)
              );
            } else {
                const { data, error } = await supabase
                    .from('favorite')
                    .insert([{ id: episodeId }]);
                if (error) {
                    console.error('Error adding favorite:', error);
                } else {
                    setFavEpisode((prevFavs) => [...prevFavs, data[0]]);
                }
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };
    const fillHeart = (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart-fill" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
        </svg>
    )
    const hollowHeart = (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-heart" viewBox="0 0 16 16">
            <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z"/>
        </svg>
    )
    
    const [activeButton, setActiveButton] = useState('Default');

    const handleButtonClick = (buttonName) => {
      setActiveButton(buttonName);
    };

    if (favEpisode === null) {
        return []; 
    }

    function sortingData() {
        const defaultArrange = favEpisode
        const arrangeA_Z = [...favEpisode].sort((a, b) => a.title.localeCompare(b.title))
        const arrangeZ_A = [...favEpisode].sort((a, b) => b.title.localeCompare(a.title))
        const ascendingOrder = [...favEpisode].sort((a, b) => new Date(a.updated) - new Date(b.updated))
        const descendingOrder = [...favEpisode].sort((a, b) => new Date(b.updated) - new Date(a.updated))

        if (activeButton === 'Default' ) {
            return defaultArrange
        }
        if (activeButton === 'A-Z' ) {
            return arrangeA_Z
        }
        if (activeButton === 'Z-A' ) {
            return arrangeZ_A
        }
        if (activeButton === 'Latest date' ) {
            return ascendingOrder
        }
        if (activeButton === 'Oldest date' ) {
            return descendingOrder
        }
    }

    const dataSorting = sortingData()

    console.log(dataSorting)

    function EpisodeCard({ eachEpi }) {
        return (
          <div className="episode_data" key={eachEpi.id}>
            <Card body>
              <div
                className="card-header"
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <h2>{eachEpi.showName}</h2>
                <div className="favourite-episode" onClick={() => toggleFavorite(eachEpi.id)}>
                  <span style={{ marginRight: '1rem' }}>S{eachEpi.season} : E{eachEpi.episode}</span>
                  {favEpisode.some((epi) => epi.id === eachEpi.id) ? fillHeart : hollowHeart}
                </div>
              </div>
              <small className="text-body-secondary">Last updated</small>
              <h5>{eachEpi.title}</h5>
              <p>Description: {eachEpi.description}</p>
              <audio controls>
                <source src={eachEpi.file} type="audio/mpeg" />
              </audio>
            </Card>
          </div>
        )
    }
   
    return (
        <div>
          <Modal {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
            <Modal.Header closeButton>
              <div>
                <Modal.Title id="contained-modal-title-vcenter">Favorite</Modal.Title>
                <Accordion defaultActiveKey="0" flush>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Sort By</Accordion.Header>
                    <Accordion.Body>
                      <CustomShowArrangement handleButtonClick={handleButtonClick} activeButton={activeButton} />
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </Modal.Header>
            <Modal.Body>
              <div>
                {fetchError && <p>{fetchError}</p>}
                {dataSorting &&
                  dataSorting.map((eachEpi) => <EpisodeCard key={eachEpi.id} eachEpi={eachEpi} />)}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      )  
}

