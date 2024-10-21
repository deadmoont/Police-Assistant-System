import "./CSS/homepage.css";
export default function Footer() {
  return (
    <footer className="p-3 text-bg-dark  ">
      <div class="d-flex">
        <div class="p-2">
          <p className="nav-link px-2 text-white">© 2024 Company, Inc</p>
        </div>

        <div class="ms-auto p-2">
          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-white">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-white">
                Features
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-white">
                FAQs
              </a>
            </li>
            <li className="nav-item">
              <a href="#" className="nav-link px-2 text-white">
                About
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
