import amazon from 'assets/pictures/Amazon Pay.png';
import logo from 'assets/pictures/header-logo.png';
import fb from 'assets/pictures/fb-ft.svg';
import insta from 'assets/pictures/insta-ft.svg';
import master from 'assets/pictures/Mastercard.png';
import netbanking from 'assets/pictures/Netbanking.png';
import upi from 'assets/pictures/UPI.png';
import visa from 'assets/pictures/Visa.png';
// import logo from 'assets/pictures/header-logo.png';
import wh from 'assets/pictures/wh-ft.svg';
import { Link } from "react-router-dom";

import { Fragment, useState } from "react";
import { API_ENDPOINTS, request } from 'utilities';
import notification from 'utilities/notification';

function Footer() {
	const [email, setEmail] = useState('')
	const handleSubmit = (e) => {
		e.preventDefault()
		request.post(API_ENDPOINTS.NEWSLETTER, { email })
			.then(response => {
				if (response?.success) {
					notification('success', response?.message)
					setEmail('')
				}
			})
	}

	return (
		<Fragment>
			<div className="container-fluid footsection ">
				<div className="main-footer-section">
					<div className="row  pt-5 pb-5 ">
						<div className="col-lg-6 col-md-5">
							<div className='footer-logo-section mt-3'>
								<img src={logo} alt="" />
								<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna </p>
							</div>

						</div>
						<div className="col-lg-4 col-md-4">
							<div className="footdata">
								<ul>
									<li>
										<div className="foothead mb-3">
											BEAUTE INDIA
										</div>
									</li>
									<Link to="/#"><li>Who we are ?</li></Link>
									<Link to="#"><li>Terms & Conditions</li></Link>
									<Link to="#"><li>We respect your privacy </li></Link>
									<Link to="#"><li>Contact Us</li></Link>
									<Link to="#"><li>Shipping & Returns</li></Link>
									<Link to="#"><li>Authentication Certificate </li></Link>
									<Link to="#"><li>FAQs</li></Link>
								</ul>
							</div>
							<div className="child-foot">
								<p className="mt-4">Sign up for our Newsletter</p>
								<form onSubmit={handleSubmit}>
									<div className="foot-email-block mt-3 d-flex">

										<input type="email" name='email' className="foot-email" placeholder="Your email address" required onChange={e => setEmail(e.target.value)} value={email} />

										<button type='submit' className='f-email border-0'></button>
									</div>
								</form>
								<div className="cards-img mt-3">
									<img src={visa} alt="" />
									<img src={master} alt="" />
									<img src={upi} alt="" />
									<img src={netbanking} alt="" />
									<img src={amazon} alt="" />
								</div>
							</div>

						</div>
						<div className="col-lg-2 col-md-3">


							<div className="footdata">
								<ul>
									<li>
										<div className="foothead mb-3">
											SHOP BY
										</div>
									</li>
									<Link to="#"><li>Fragrance For Him</li></Link>
									<Link to="#"><li>Fragrance For Her</li></Link>
									<Link to="#"><li>Makeup</li></Link>
									<Link to="#"><li>Body Care</li></Link>
									<Link to="#"><li>Home Fragrance</li></Link>
									<Link to="#"><li>Luggage</li></Link>
								</ul>
							</div>
							<div className="footdata">
								<ul className="quick-links">
									<li>
										<div className="foothead mb-3 mt-5">
											QUICK LINKS:
										</div>
									</li>
									<img src={fb} alt="" />&nbsp;&nbsp;&nbsp;
									<img src={wh} alt="" />&nbsp;&nbsp;
									<img src={insta} alt="" />
								</ul>
							</div>
						</div>
					</div>

				</div>
			</div>
		</Fragment>
	)
}

export default Footer;
