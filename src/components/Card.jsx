import { useRef, useState } from 'react';


export const Type1 = ({ name, icon }) => {
    return (
        <div className="card type-1">
            <div className="card-icon top">
                <h4>
                    {name}
                    <img src={icon} alt={name} />
                </h4>
            </div>
            <div className="card-content">
                <img src={icon} alt={name} />
            </div>
            <div className="card-icon bottom">
                <h4>
                    {name}
                    <img src={icon} alt={name} />
                </h4>
            </div>
        </div>
    )
}

export const Type2 = ({ name, img, description, preview, tags }) => {

    const [liked, setLike] = useState(false);

    const openURL = (url) => {
        window.open(url, "_blank");
    }

    const [currentIndex, setCurrentIndex] = useState(0);
    const galleryRef = useRef();

    const handleScroll = () => {
        const container = galleryRef.current;

        const index = Math.round(
        container.scrollLeft / container.clientWidth
        );

        setCurrentIndex(index);
    };

    return (
        <div className="card type-2">
            <div className="card-title">
                <h4>{name}</h4>
            </div>
            <div className="card-image">
                <div 
                    className="image-list"
                    ref={galleryRef}
                    onScroll={handleScroll}
                >
                    {img.map((image, index) => (
                        <img 
                            key={index} 
                            src={image} 
                            alt="" 
                            onClick={() => setCurrentIndex(index)}
                        />
                    ))}
                </div>
                <div className="pagination">
                    {img.map((_, index) => (
                        <span 
                            key={index} 
                            className={index === currentIndex ? "active" : ""}
                            onClick={() => {
                                setCurrentIndex(index);
                                galleryRef.current.scrollTo({
                                    left: index * galleryRef.current.clientWidth,
                                    behavior: "smooth"
                                });
                            }}
                        ></span>
                    ))}
                </div>
                <div className="index-indicator">
                    {currentIndex + 1}  /{img.length}
                </div>
            </div>
            <div className="card-content">
                <div className="buttons">
                    <div className="left">
                        <i 
                            className={liked ? "bi bi-heart-fill" : "bi bi-heart"} 
                            style={{color: liked ? "rgb(var(--red-color))" : "rgb(var(--black-color))"}}
                            onClick={() => setLike(!liked)}
                        />
                        <i className="bi bi-chat" />
                        <i className="bi bi-send" />
                    </div>
                    <div className="right">
                        <i 
                            className="bi bi-box-arrow-up-right"
                            onClick={() => openURL(preview)}
                        />
                    </div>
                </div>
                <div className="description">
                    {description}
                </div>
                <div className="tools-tag">
                    {tags.map((tag, index) => (
                        <span key={index}>#{tag}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}

export const Type3 = ({ name, img, onSelect }) => {
    return (
        <div className="card type-3" onClick={onSelect}>
            <img src={img} alt={name} />

              <div className="overlay">
                <h3>{name}</h3>
                <p>
                    View Details
                    <i className="bi bi-arrow-right"></i>
                </p>
            </div>
        </div>
    )
}
