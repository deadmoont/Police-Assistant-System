import Navbar from "./Navbar";
import Footer from "./Footer";
import "./CSS/Queueopener.css";
import { useNavigate } from "react-router-dom";

const Queueopener = () => {
  const navigate = useNavigate(); // Initialize navigate function

  const handleSubmitApplicationClick = () => {
    // Navigate to the MemoApp page when the button is clicked
    navigate("/memoapp");
  };
  const handleAllqueriesnClick = () => {
    // Navigate to the MemoApp page when the button is clicked
    navigate("/all-queries");
  };
  const handlefinishqueriesnClick = () => {
    // Navigate to the MemoApp page when the button is clicked
    navigate("/queries-finished");
  };

  return (
    <div>
      <Navbar />
      <div className="container5">
        <div className="cardcont">
          <div className="card" style={{ width: "18rem" }}>
            <img
              src="../Images/queue.jpg"
              className="card-img-top"
              alt="Camera Monitoring"
              style={{ height: "18rem" }}
            />
            <div className="card-body">
              <h5 className="card-title">Submit application</h5>
              <p className="card-text">
                Submit a police complaint application to report incidents like theft or assault, providing details, date, and contact information for investigation.
              </p>
              <button onClick={handleSubmitApplicationClick} className="btn btn-primary">
                Submit application
              </button>
            </div>
          </div>

          <div className="card" style={{ width: "18rem" }}>
            <img
              src="../Images/queueall.jpg"
              className="card-img-top"
              alt="Camera Monitoring"
              style={{ height: "18rem" }}
            />
            <div className="card-body">
              <h5 className="card-title">All queries</h5>
              <p className="card-text">
                Submitted queries to the police to inquire about ongoing investigations, case statuses, or request updates on filed complaints.
              </p>
              <button onClick={handleAllqueriesnClick} className="btn btn-primary">
               All Queries
              </button>
            </div>
          </div>

          <div className="card" style={{ width: "18rem" }}>
            <img
              src="../Images/queuedone..jpg"
              className="card-img-top"
              alt="Camera Monitoring"
              style={{ height: "18rem" }}
            />
            <div className="card-body">
              <h5 className="card-title">Completed Queries</h5>
              <p className="card-text">
                Queries to the police regarding completed cases, final reports, or resolutions, and request official closure details or documentation.
              </p>
              <button onClick={handlefinishqueriesnClick} className="btn btn-primary">
               Finished Queries
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Queueopener;
