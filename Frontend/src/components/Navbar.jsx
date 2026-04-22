import { NAV_ITEMS } from "../data/constants";

export default function Navbar({ activeSection, menuOpen, setMenuOpen, scrollTo }) {
  return (
    <>
      <nav className="nav">
        <a
          className="nav-logo"
          href="#home"
          onClick={(e) => { e.preventDefault(); scrollTo("home"); }}
        >
          &gt;_ PRIT<span>.SH</span>
        </a>

        <ul className="nav-links">
          {NAV_ITEMS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={activeSection === id ? "active" : ""}
                onClick={(e) => { e.preventDefault(); scrollTo(id); }}
              >
                {id}
              </a>
            </li>
          ))}
        </ul>

        <div className="hamburger" onClick={() => setMenuOpen((m) => !m)}>
          <span /><span /><span />
        </div>
      </nav>

      <div className={`mobile-nav ${menuOpen ? "open" : ""}`}>
        {NAV_ITEMS.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => { e.preventDefault(); scrollTo(id); }}
          >
            {id}
          </a>
        ))}
      </div>
    </>
  );
}
