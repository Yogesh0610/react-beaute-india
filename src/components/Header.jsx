import cart from 'assets/pictures/cart.svg';
import logo from 'assets/pictures/header-logo.png';
import searchIcon from 'assets/pictures/search.svg';
import whishlist from 'assets/pictures/whishlist.svg';
import { useCart, useUser } from 'hooks';
import { Fragment, useState } from 'react';
import { NavDropdown } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { logout } from 'store/auth/actions';
import { destroy } from 'store/shop/actions';
import { API_ENDPOINTS } from "utilities";

function Header() {
	const dispatch = useDispatch()
	const { user } = useUser()
	const { totalQuantity } = useCart()
	const [search, setSearch] = useState(null)

	let [searchParams] = useSearchParams();
	const navigate = useNavigate()

	const handleNavigate = (e, key, value) => {
		const Obj = {}
		for (const [key, value] of searchParams) {
			Object.assign(Obj, { [key]: value })
		}
		Object.assign(Obj, { [key]: value })
		const query = new URLSearchParams(Obj).toString()
		navigate(`/products?${query}`);
	}

	const onSubmit = (e) => {
		e.preventDefault()
		console.log(typeof search);
		if (search) {
			handleNavigate('', 'search', search)
		}
	}

	const removeShop = () => {
		dispatch(destroy(API_ENDPOINTS.LOGOUT))
			.then(response => {
				if (response) {
					window.location.href = '/'
				}
			})
	}

	const logoutUser = () => {
		dispatch(logout(API_ENDPOINTS.AUTH.LOGOUT))
			.then(response => {
				if (response?.success) {
					window.location.href = '/products'
				}
			})
	}



	return (
		<Fragment>
			<div className="navhead">
				<div className="logoo">
					<Link to="/">
					<img src={logo} style={{height: "1.2rem"}} alt="" />
					</Link>

				</div>
				<ul className="navhead-links" id="myDIV">
					<li>
						<div className="wrapper">
							<div className="container searchcontainer">
								<div className="search_wrap search_wrap_1">
									<form onSubmit={onSubmit}>
										<div className="search_box">
											<input
												type="text"
												className="input-search"
												placeholder=""
												value={search}
												onChange={e => setSearch(e.target.value)}
											/>
											<button type='submit' className="btn btn_common" >

												<img src={searchIcon} className="search-img" alt="" />

											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</li>
					<li>

						<Link to="/productdetail">
							<img src={whishlist} className="heart-img" alt="" />
						</Link>

					</li>
					<li>
						<Link to="/cart" className=''>
							<div className='text-center'>
								<span style={{ fontSize: 12 }} className=' bg-light p-1 rounded'>
									{totalQuantity}
								</span>
							</div>
							<img src={cart} className="cart-img" alt="" />
						</Link>
					</li>
					<li>
						<NavDropdown
							id="nav-dropdown-dark-example"
							title={user?.name || 'Account'}
							menuVariant="dark"
						>
							{user && (
								<Fragment>
									<NavDropdown.Item onClick={logoutUser}>
										Logout User
									</NavDropdown.Item>
									<NavDropdown.Divider />
								</Fragment>
							)}

							<NavDropdown.Item onClick={removeShop}>
								Logout Shop
							</NavDropdown.Item>
						</NavDropdown>
					</li>
				</ul>

				<div className="hamburger" onClick="myFunction()">
					<div></div>
					<div></div>
					<div></div>
				</div>
			</div>

		</Fragment>
	)
}

export default Header;