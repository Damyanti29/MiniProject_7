import videoBg from "../assets/background.mp4";
import "./BackgroundVideo.css";

const BackgroundVideo = () => {
  return (
    <>
      <video autoPlay loop muted className="video-bg">
        <source src={videoBg} type="video/mp4" />
      </video>

      <div className="overlay"></div>
    </>
  );
};

export default BackgroundVideo;