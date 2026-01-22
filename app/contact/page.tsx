import Breadcrumbs from '../components/Breadcrumbs';

export default function ContactPage() {
  return (
    <>
      <Breadcrumbs title="Contact Us" />

      <div id="back-contact" className="back-contact-page pt-70 pb-70">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="back-blog-form">
                <div className="back-title">
                  <h2>Get in Touch</h2>
                </div>
                <div className="row">
                  {/* Left address column */}
                  <div className="col-lg-3 back-address pt-12">
                    <strong>Call Us</strong>
                    <br />
                    <a href="tel:(404)888123456"> (404) 888 123 456 </a>
                    <br />
                    <a href="tel:(204)888234674"> (204) 888 234 674 </a>
                    <br />

                    <strong className="pt-30">Email Address</strong>
                    <br />
                    <a href="mailto:info@gmail.com">info@gmail.com</a>
                    <a href="mailto:info@gmail.com">name@gmail.com</a>

                    <strong className="pt-30">Local Adress</strong>
                    <br />
                    <p>New York, USA 2578 HAY</p>

                    <strong className="pt-30">Social Share</strong>
                    <br />
                    <ul className="social-link">
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-facebook-f"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-instagram"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fa-brands fa-linkedin-in"></i>
                        </a>
                      </li>
                    </ul>
                  </div>

                  {/* Right form column */}
                  <div className="col-lg-9">
                    <div id="blog-form" className="blog-form">
                      <div id="form-messages"></div>
                      <form id="contact-form">
                        <div className="row">
                          <div className="col-lg-6">
                            <div className="back-input">
                              <input id="name" type="text" name="name" placeholder="Name" />
                            </div>
                          </div>

                          <div className="col-lg-6 pdl-5">
                            <div className="back-input">
                              <input id="email" type="email" name="email" placeholder="Email" />
                            </div>
                          </div>

                          <div className="col-lg-6">
                            <div className="back-input">
                              <input id="subject" type="text" name="subject" placeholder="Subject" />
                            </div>
                          </div>

                          <div className="col-lg-6 pdl-5">
                            <div className="back-input">
                              <input id="phone" type="text" name="phone" placeholder="Phone" />
                            </div>
                          </div>

                          <div className="col-lg-12">
                            <div className="back-textarea">
                              <textarea id="message" name="message" placeholder="Message"></textarea>
                            </div>
                          </div>

                          <div className="col-lg-12">
                            <button type="submit" className="back-btn">
                              Send your Message
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map section */}
      <div className="back-contacts">
        <div className="back-image-maping">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6146815.663617162!2d-76.67912441489939!3d37.15636527506046!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2z4Kau4Ka-4Kaw4KeN4KaV4Ka_4KaoIOCmr-CngeCmleCnjeCmpOCmsOCmvuCmt-CnjeCmn-CnjeCmsA!5e0!3m2!1sbn!2sbd!4v1653110653067!5m2!1sbn!2sbd"
            width="100%"
            height="500"
            className="iframe-no-border"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </>
  );
}


