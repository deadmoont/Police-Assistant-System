import Video from "./Announcement.mp4";
import "./CSS/HomePageText.css";
const Announcements = () => {
  return (
    <div className="speaker">
      <video
        width="15%"
        height="15%"
        autoPlay
        loop
        muted
        style={{ borderRadius: "8px", marginTop: "20px" }}
      >
        <source src={Video} type="video/mp4" />
        {/* Your browser does not support the video tag. */}
      </video>
    </div>
  );
};
export default Announcements;
