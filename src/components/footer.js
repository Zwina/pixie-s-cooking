import React from "react";

function Footer() {
  return (
    <footer className="page-footer font-small bg-dark text-white pt-4">
      <div className="container-fluid text-center text-md-left">
        <div className="row">
          <div className="col-md-6 mt-md-0 mt-3">
            <h5 className="text-uppercase text-warning">Pixie's Cooking</h5>
            <p>
              Pour découvrir, partager et retrouver toutes vos recettes préférées.
            </p>
          </div>

          <hr className="clearfix w-100 d-md-none pb-0" />

          <div className="col-md-3 mb-md-0 mb-3">
            {/* <h5 className="text-uppercase">Links</h5> */}
            <ul className="list-unstyled">
              <li>
                <a href="/voirtout" className="text-white">Toutes les recettes</a>
              </li>
              <li>
                <a href="/voirparcategories" className="text-white">Les catégories</a>
              </li>
              <li>
                <a href="/voirparthemes" className="text-white">Les thèmes</a>
              </li>
            </ul>
          </div>

          <div className="col-md-3 mb-md-0 mb-3">
            {/* <h5 className="text-uppercase">Links</h5> */}
            <ul className="list-unstyled">
              <li>
                <a href="#!" className="text-white">Mentions légales</a>
              </li>
              <li>
                <a href="#!" className="text-white">Aide</a>
              </li>
              <li>
                <a href="#!" className="text-white">Nous contacter</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-copyright text-center py-3">
        © Pixie's Cooking 2023 - Marjorie Kehil : {" "}
        <a href="https://marjorie-kehil.vercel.app/"  target="_blank" className="text-white">Portfolio</a>
      </div>
    </footer>
  );
}

export default Footer;
