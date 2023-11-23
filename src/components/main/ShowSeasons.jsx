//ShowSeasons.jsx
import './ShowSeasons.css'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import EpisodesModal from './EpisodesModal';
import './ShowSeasons.css';

export default function ShowSeason(props) {
    const [selectSeason, setSelectSeason] = useState(null);

    const [showEpisodesModal, setShowEpisodesModal] = useState(false)

    function handleSeasonClick(seasonNumber) {
        setShowEpisodesModal(true)
        setSelectSeason(
            (prevSeason) =>{
            return prevSeason === seasonNumber ? null : seasonNumber 
            }
        );
    }

    function renderSeasons() {
        return (
            <div>
                {props.data.seasons.map((seasonData) => (
                    <div key={seasonData.season}>
                    <Card body>
                        <div
                            className='season_block' 
                            onClick={(() => handleSeasonClick(seasonData.season))}
                            style={{display: 'flex', color: 'white'}}
                        >
                            <div style={{width: '50%'}}>Season: {seasonData.season}</div>
                            <div>E:{seasonData.episodes.length}</div>
                        </div>
                    </Card>
                    </div>
                    ))
                }
            </div>
        );
    }

    // Function to open the episodes modal
    function openEpisodesModal() {
    setShowEpisodesModal(true);
    }

    // Function to close the episodes modal
    function closeEpisodesModal() {
    setShowEpisodesModal(false);
    props.handleClose();
    }

    return (
        <div className='container'>
            <Modal
            show={props.show}
            onHide={props.handleClose}
            backdrop="static"
            keyboard={false}
            size = 'xl'
            >
            <Modal.Header closeButton>
                <div className="card mb-3" style={{maxWidth: '6000px', maxHeight: '400px'}}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={props.data.image} className="img-fluid rounded-start" />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                            <h5 className="card-title">{props.data.title}</h5>
                            <p className="card-text">{props.data.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Header>

                <Modal.Body> 
                    {renderSeasons()}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.handleClose}>
                    Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <div>
        </div>
            <EpisodesModal
                show={showEpisodesModal}
                handleClose={closeEpisodesModal}
                selectedSeasonData={props.data.seasons.find((seasonData) => seasonData.season === selectSeason)}
                seasons={props.data.seasons} 
                selectedSeason={selectSeason}
                showTitle={props.data.title}
                updated={props.updated}
            />
        </div>
    );
}