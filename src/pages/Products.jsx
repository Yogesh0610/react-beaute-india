/* eslint-disable react-hooks/exhaustive-deps */
import filterImg from 'assets/pictures/filter.png';
import hrView from 'assets/pictures/hr-view.svg';
import squareView from 'assets/pictures/square-view.svg';

import Footer from 'components/Footer';
import Header from 'components/Header';
import { ProductCard,ProductCardListView, ProductQuery, Sidebar, Slider } from 'components/products';
import { useShop } from 'hooks';
import { Fragment, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';


const Products = () => {
	const { isLoggedIn } = useShop()
	const navigate = useNavigate()
	let [searchParams] = useSearchParams()

	useEffect(() => {
		if (!isLoggedIn) {
			navigate('/')
		}
	}, [isLoggedIn])
	const { data } = ProductQuery()

	const handleNavigate = (e, key, value) => {
		const Obj = {}
		for (const [key, value] of searchParams) {
			if (key === 'price') {
				Object.assign(Obj, { 'price_min': value[0] })
				Object.assign(Obj, { 'price_max': value[1] })
			} else {
				Object.assign(Obj, { [key]: value })
			}
		}
		if (key === 'price') {
			Object.assign(Obj, { 'price_min': value[0] })
			Object.assign(Obj, { 'price_max': value[1] })
		} else {
			Object.assign(Obj, { [key]: value })
		}
		// Object.assign(Obj, { [key]: value })
		const query = new URLSearchParams(Obj).toString()
		navigate(`/products?${query}`);
	}

	return (
		<Fragment>
			<Header />

			<Slider />

			<div className="container-fluid">
				<div className="row">
					<div className="col-lg-2 col-md-3 sidebar-contect" id="side">
						<Sidebar />
					</div>

					<div className="col-lg-10 col-md-9 main-content" >

						<h1 className="mb-4" style={{fontSize:"24px"}}>
							Product list
						</h1>
						<div className="container-fluid ">
							<div className="row main-row">
								<div className="row sorting-section">


									<div className="main-box">
										<div className="box1 ">
											<div className='d-flex'>
												<p>VIEW AS</p>
												<img className='im-1 mx-1' style={{ height: 20 }} src={squareView} alt="" />
												{/* <img className='im-2' style={{ height: 20 }} src={hrView} alt="" /> */}
											</div>
										</div>
										<div className="box2 "><p>ITEMS PER PAGE:50</p></div>
										<div className="box3 ">
											<select className="form-select form-filter" aria-label="Default select example" onChange={(e) => handleNavigate(e, 'sort_by', e.target.value)}>
												<option selected>Default Sorting</option>
												<option value="popularity">Popularity</option>
												<option value="low">Price High to Low</option>
												<option value="high">Price Low to High</option>
											</select>
										</div>
										<div className="box4 " >
											<p>
												<span onClick="openside()">
													<img src={filterImg} width="10%" alt="" />&nbsp;&nbsp;Filter
												</span>
											</p>
										</div>
									</div>



								</div>
							</div>

							<div className="row text-center mt-2 mb-5 ">
								{data.length > 0 ? (
									<Fragment>
										{data.map((product, idx) => (
											<Fragment key={idx}>
												<ProductCard product={product} />
											</Fragment>
										))}
									</Fragment>
								) : (
									<div className='alert alert-info'>No product found</div>
								)}
							</div>

						</div>
					</div>
				</div>

			</div>



			<Footer />
		</Fragment>
	)

}

export default Products;