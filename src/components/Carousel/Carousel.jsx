//carousel
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Spinner from 'react-bootstrap/Spinner';

export default function PodcastCarousel() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [podcasts, setPodcasts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await fetch('https://podcast-api.netlify.app/shows');
        const data = await response.json();
        setPodcasts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching podcasts:', error);
      }
    };

    fetchPodcasts();
  }, []);

  if (loading) {
    return <div className='loader'><Spinner animation="grow" /></div>;
  }

  return (
    <Slider {...settings} className='slider--opt'>
      {podcasts.map((podcast) => (
        <div key={podcast.id}>
          <img className='image'
            src={podcast.image}
          />
        </div>
      ))}
    </Slider>
  );
}
