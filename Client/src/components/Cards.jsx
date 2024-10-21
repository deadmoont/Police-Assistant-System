import "./CSS/homepage.css";
const Cards = () => {
  return (
    <div className="row big-box">
      <div className="mycard" style={{ width: "18rem" }}>
        <img
          src="../Images/CameraFoo.svg"
          className="card-img-top"
          alt="..."
          style={{ height: "18rem" }}
        />
        <div className="card-body">
          <p className="card-text myfont">Camera Monitoring</p>
        </div>
      </div>
      <div className="mycard" style={{ width: "18rem" }}>
        <img
          src="../Images/TrackerOri.svg"
          className="card-img-top trackerimg"
          alt="..."
          style={{ height: "18rem" }}
        />
        <div className="card-body">
          <p className="card-text myfont">Staff Tracker</p>
        </div>
      </div>
      <div className="mycard" style={{ width: "17rem" }}>
        <img
          src="../Images/Queue.svg"
          className="card-img-top"
          alt="..."
          style={{ height: "18rem" }}
        />
        <div className="card-body card-text">
          <p className="card-text myfont">Queueing</p>
        </div>
      </div>
      <div className="mycard" style={{ width: "17rem" }}>
        <img
          src="../Images/Database.svg"
          className="card-img-top"
          alt="..."
          style={{ height: "18rem" }}
        />
        <div className="card-body">
          <p className="card-text myfont">Database</p>
        </div>
      </div>
    </div>
  );
};
export default Cards;
