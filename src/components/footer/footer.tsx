import React, { Component } from "react";
class Footer extends Component {
  render() {
    return (
      <>
        <>
          <footer className="footer bg-dark position-relative" id="footerSection">
            <div className="footer-middle">
              <div className="container position-static">
                <div className="row">
                  <div className="col-lg-3 col-sm-6 pb-2 pb-sm-0">
                    <div className="widget">
                      <a href="#">
                        <img
                          src="/assets/images/logo-footer.png"
                          alt="Logo"
                          className="logo-footer"
                        />
                      </a>
                      <div className="social-icons">
                        <a
                          href="#"
                          className="social-icon social-facebook icon-facebook"
                          target="_blank"
                          title="Facebook"
                        />
                        <a
                          href="#"
                          className="social-icon social-twitter icon-twitter"
                          target="_blank"
                          title="Twitter"
                        />
                        <a
                          href="#"
                          className="social-icon social-linkedin fab fa-linkedin-in"
                          target="_blank"
                          title="Linkedin"
                        />
                      </div>
                    </div>
                    {/* End .widget */}
                  </div>
                  {/* End .col-lg-3 */}
                  <div className="col-lg-2 col-sm-6 pb-4 pb-sm-0">
                    <div className="widget">
                      <h4 className="widget-title pb-1">Buy</h4>
                      <ul className="links">
                        <li>
                          <a href="#">Quote the price</a>
                        </li>
                        <li>
                          <a href="#">Auction price</a>
                        </li>
                        <li>
                          <a href="#">Buy product</a>
                        </li>
                      </ul>
                    </div>
                    {/* End .widget */}
                  </div>
                  {/* End .col-lg-3 */}
                  <div className="col-lg-2 col-sm-6 pb-2 pb-sm-0">
                    <div className="widget">
                      <h4 className="widget-title pb-1">Sell</h4>
                      <ul className="links">
                        <li>
                          <a href="#">Start selling</a>
                        </li>
                        <li>
                          <a href="#">Learn to sell</a>
                        </li>
                        <li>
                          <a href="#">Affiliates</a>
                        </li>
                      </ul>
                    </div>
                    {/* End .widget */}
                  </div>
                  {/* End .col-lg-3 */}
                  <div className="col-lg-3 col-sm-6 pb-2 pb-sm-0">
                    <div className="widget">
                      <h4 className="widget-title pb-1">About Stocknikalo</h4>
                      <ul className="links">
                        <li>
                          <a href="#">Company info</a>
                        </li>
                        <li>
                          <a href="#">News</a>
                        </li>
                        <li>
                          <a href="#">Terms &amp; policies</a>
                        </li>
                        <li>
                          <a href="#">Advertise with us</a>
                        </li>
                      </ul>
                    </div>
                    {/* End .widget */}
                  </div>
                  {/* End .col-lg-3 */}
                  <div className="col-lg-2 col-sm-6 pb-0">
                    <div className="widget mb-1 mb-sm-3">
                      <h4 className="widget-title">Contact Us</h4>
                      <p>
                        <a href="mailto:hello@stocknikalo.com">
                          hello@stocknikalo.com
                        </a>
                      </p>
                      <p>+91 876662000</p>
                    </div>
                    {/* End .widget */}
                  </div>
                  {/* End .col-lg-3 */}
                </div>
                {/* End .row */}
              </div>
              {/* End .container */}
            </div>
            {/* End .footer-middle */}
            <div className="container">
              <div className="footer-bottom d-sm-flex align-items-center text-center">
                <div className="text-center w-100">
                  <span className="footer-copyright">
                    © 2022 stocknikalo.com All rights reservedd
                  </span>
                </div>
              </div>
            </div>
            {/* End .footer-bottom */}
          </footer>
          <div hidden={true} className="loading-overlay">
            <div className="bounce-loader">
              <div className="bounce1" />
              <div className="bounce2" />
              <div className="bounce3" />
            </div>
          </div>
          <div className="mobile-menu-overlay" />
          {/* End .mobil-menu-overlay */}
          <div className="mobile-menu-container">
            <div className="mobile-menu-wrapper">
              <span className="mobile-menu-close">
                <i className="fa fa-times" />
              </span>
              <nav className="mobile-nav">
                <ul className="mobile-menu menu-with-icon">
                  <li>
                    <a href="#">
                      <i className="fas fa-bars" /> &nbsp;Ready To Ship
                    </a>
                    <ul>
                      <li>
                        <a href="#">Ready To Ship 01</a>
                      </li>
                      <li>
                        <a href="#">Ready To Ship 02</a>
                      </li>
                      <li>
                        <a href="#">Ready To Ship 03</a>
                      </li>
                    </ul>
                    {/* End .megamenu */}
                  </li>
                  <li>
                    <a href="#">Ready To Ship</a>
                  </li>
                  <li>
                    <a href="#">Trade Show</a>
                  </li>
                  <li>
                    <a href="#">Personal Protectieve Equipment</a>
                  </li>
                  <li>
                    <a href="#">Services</a>
                    <ul>
                      <li>
                        <a href="#">Services 01</a>
                      </li>
                      <li>
                        <a href="#">Services 02</a>
                      </li>
                      <li>
                        <a href="#">Services 03</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Sell On Stocknikalo</a>
                    <ul>
                      <li>
                        <a href="#">Sell On Stocknikalo 01</a>
                      </li>
                      <li>
                        <a href="#">Sell On Stocknikalo 02</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#">Help</a>
                    <ul>
                      <li>
                        <a href="#">Help</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </nav>
              {/* End .mobile-nav */}
              <div className="social-icons">
                <a
                  href="#"
                  className="social-icon social-facebook icon-facebook"
                  target="_blank"
                ></a>
                <a
                  href="#"
                  className="social-icon social-twitter icon-twitter"
                  target="_blank"
                ></a>
                <a
                  href="#"
                  className="social-icon social-instagram icon-instagram"
                  target="_blank"
                ></a>
              </div>
            </div>
            {/* End .mobile-menu-wrapper */}
          </div>
          {/* End .mobile-menu-container */}
          <div className="sticky-navbar">
            <div className="sticky-info">
              <a href="#">
                {" "}
                <i className="icon-home" />
                Home{" "}
              </a>
            </div>
            <div className="sticky-info">
              <a href="#" className="">
                {" "}
                <i className="icon-bars" />
                Categories{" "}
              </a>
            </div>
            <div className="sticky-info">
              <a href="#" className="">
                {" "}
                <i className="icon-wishlist-2" />
                Wishlist{" "}
              </a>
            </div>
            <div className="sticky-info">
              <a href="#" className="">
                {" "}
                <i className="icon-user-2" />
                Account{" "}
              </a>
            </div>
            <div className="sticky-info">
              <a href="#" className="">
                <i className="icon-shopping-cart position-relative">
                  <span className="cart-count badge-circle">3</span>{" "}
                </i>
                Cart
              </a>
            </div>
          </div>
          {/* End .newsletter-popup */}
          <a id="scroll-top" href="#top" title="Top" role="button">
            <i className="icon-angle-up" />
          </a>
        </>
      </>
    );
  }
}

export default Footer;
