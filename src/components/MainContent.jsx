//maincontent
import { useState, useEffect } from 'react'
import ShowSeasons from './main/ShowSeasons'
import ShowCards from './main/ShowCards'
import Spinner from 'react-bootstrap/Spinner';
import './MainContent.css'
import Sidebar from './sidebar/Sidebar';
import CustomShowArrangement from './sidebar/CustomShowArrangement';
import Search from './header/Search';
import Accordion from 'react-bootstrap/Accordion'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Fuse from 'fuse.js'
import FetchFavouriteEpisode from './main/FetchFavouriteEpi';
import PodcastCarousel from './carousel/carousel';

export default function MainContent () {
    
    const [preview, setPreview] = useState([])

    const [showData, setShowData] = useState(null)

    const [show, setShow] = useState(false)

    const [loading, setLoading] = useState(true)

    const [favoriteClicked, setFavoriteClicked] = useState(false);

    const [modalShow, setModalShow] = useState(false);


    useEffect(
        () => {
            fetch('https://podcast-api.netlify.app/shows')
                .then( res => res.json())
                .then( data => {
                    setPreview(data)
                    setLoading(false)
                })
                .catch(error => {
                    console.error('Error fetching shows:', error);
                });
        }, []
    )

    const [searchInput, setSearchInput] = useState({
        search : ''
    })

    function handleSearchInput (event) {
        const {name, value} = event.target
        setSearchInput(
            prevInput => ({
                ...prevInput,
                [name]: value
            }))
    }

    const fuse = new Fuse(preview, {
        keys: [
            'title',
            // 'genres'
        ],
        includeScore: true,
        threshold: 0.5,
    });

    const results = fuse.search(searchInput.search)
    const searchResults = searchInput.search === '' ? preview : results.map(character => character.item)

    const [activeButton, setActiveButton] = useState('Default');

    const handleButtonClick = (buttonName) => {
      setActiveButton(buttonName);
    };

    function sortingData() {
        const defaultArrange = preview
        const arrangeA_Z = [...preview].sort((a, b) => a.title.localeCompare(b.title))
        const arrangeZ_A = [...preview].sort((a, b) => b.title.localeCompare(a.title))
        const ascendingOrder = [...preview].sort((a, b) => new Date(a.updated) - new Date(b.updated))
        const descendingOrder = [...preview].sort((a, b) => new Date(b.updated) - new Date(a.updated))

        if (searchInput.search !== '') {
            return searchResults 
        }

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

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCardClick = (podcastId) => {
        console.log("Clicked ID:", podcastId);

        fetch(`https://podcast-api.netlify.app/id/${podcastId}`)
            .then((res) => res.json())
            .then((data) => {
                setShowData(data);
                handleShow();
            });
    };

    const podcastShowCards = dataSorting.map((podcast) => {
        return (
            <ShowCards
                key={podcast.id}
                image={podcast.image}
                title={podcast.title}
                genres={podcast.genres}
                handleClick={() => handleCardClick(podcast.id)}
                numOfSeasons={podcast.seasons}
                description={podcast.description}
                updated = {podcast.updated}
            />
        );
    });

    const handleFavoriteClick = () => {
        setFavoriteClicked((prev => !prev));
       
    };

    if (loading) {
        return <div className='loader'><Spinner animation="grow" /></div>;
    }

    return (
        <>
        <PodcastCarousel />
        <div className='content'>
            <div className="sidebar-container"> 
            <Sidebar>
                <Search 
                    preview = {preview}
                    searchInput = {searchInput}
                    setSearchInput = {setSearchInput}
                    handleSearchInput = {handleSearchInput} 
                 />
                <Accordion defaultActiveKey="0" flush>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Filters Options</Accordion.Header>
                        <Accordion.Body>
                            <CustomShowArrangement 
                                handleButtonClick = {handleButtonClick}
                                activeButton = {activeButton}
                            />
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <Card style={{ marginTop: '11px' }}>
                    <Card.Body>
                    <div className="d-grid gap-2">
                        <Button variant="outline-primary" onClick={() => setModalShow(true)}>Favorite</Button>
                    </div>
                        <FetchFavouriteEpisode
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                        />
                    </Card.Body>
                </Card>
            </Sidebar>
            </div>
            <div className='content--container'>
                <div className='favorite-container'>{favoriteClicked && <FetchFavouriteEpisode />}</div>
                <div className="show-container">
                {favoriteClicked && <FetchFavouriteEpisode />}
                {podcastShowCards}</div>
                    {
                        showData !== null 
                        &&
                        <ShowSeasons 
                            data = {showData} 
                            handleClose = {handleClose}
                            show = {show}
                            updated = {showData.updated}
                            showTitle={showData.title}
                        />
                    }
                </div>
        </div>
        </>      
    )
}