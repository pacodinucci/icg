import React from 'react'

const BottomFooter = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-12">
                        <img src="assets/img/front/logo.png" width="150px" />
                        <p>London, United Kingdom</p>
                        <p className="copyright">Copyright My CV Tracker</p>
                        <ul className="footer-social">
                            <li><a target="_blank" href="https://www.facebook.com/My-CV-Tracker-494026290989681/"><span><i
                                className="fab fa-facebook-f"></i></span></a></li>
                            <li><a target="_blank" href="https://twitter.com/mycvtracker"><span><i
                                className="fab fa-twitter"></i></span></a></li>
                            <li><a href=""><span><i className="fab fa-instagram"></i></span></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default BottomFooter