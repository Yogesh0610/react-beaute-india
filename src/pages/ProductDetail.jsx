/* eslint-disable react-hooks/exhaustive-deps */
import nounLove from "assets/pictures/noun-love-4726271.svg";
import ractangleImage from 'assets/pictures/Rectangle 633.png';
import QuantityUpdate from "components/cart/QuantityUpdate";
import Footer from 'components/Footer';
import Header from 'components/Header';
import { ProductCard, ProductQuery } from "components/products";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { add } from "store/cart/actions";
import notification from "utilities/notification";

const ProductDetail = () => {
	const { id } = useParams()
	const dispatch = useDispatch()
	const { data: product } = ProductQuery(id)
	const { data: carts } = useSelector(state => state.cart)
	const currentItem = carts.find(item => item?.id === product?.id)
	const { data: products } = ProductQuery()

	const addToCart = () => {
		const data = {
			id: product?.id || 0,
			product_id: product?.id || 0,
			name: product?.name || '',
			price: Number(product?.sale_price) > 0 ? Number(product?.sale_price) : Number(product?.normal_price),
			quantity: 1,
			// attributes: values.attributes,
			model: product || {}
		}
		dispatch(add(data))
		notification('success', 'Product Added To Cart');
	}

	return (
		<Fragment>
			<Header />
			<div className="container-fluid mt-5">
				<div className="main-product-details">
					<div className="container">
						<div className="row ">
							<div className="col-lg-5 ">
								<div className="main-product">
									<img src={product?.image || ractangleImage} alt="" />


								</div>
								{/* <div className="more-product text-center mt-3">
									<img src={ractangleImage} alt="" />
									<img src={ractangleImage} alt="" />
									<img src={ractangleImage} alt="" />
								</div> */}
							</div>
							<div className="col-lg-7">
								<div className="product-details">
									<h3 style={{fontSize:"26px"}}>{product?.name}  </h3>
									{/* <h3 style={{fontSize:"24px"}}>{product?.sale_price}  </h3> */}
									{/* <div className=" pt-3 pe-5 b-2"  dangerouslySetInnerHTML={{ __html: product?.stock?.name }} /> */}
									<div className=" pt-3 pe-5 mb-2" dangerouslySetInnerHTML={{ __html: product?.short_description?.name }} />
									{/* <div dangerouslySetInnerHTML={{ __html: product?.short_description }} /> */}
									
									{/* <div className=" pt-3 pe-5 mb-2" dangerouslySetInnerHTML={{ __html: product?.short_description?.name }} /> */}
									
									<div classname="pro-name mt-4">
									    <span className=" pt-3 b-2 pe-5" style={{fontSize:"20px"}}>Brand: </span> <span> {product?.brand?.name}</span><br></br>
										<span className=" pt-4  pe-5 b-2" style={{fontSize:"20px"}}>Size: </span> <span>   {  product?.size?.name}</span>
										
										<div className=" pt-3 pe-5 mb-2" dangerouslySetInnerHTML={{ __html: product?.short_description?.name }} />
									</div>

									{
										product?.sale_price > 0 ? (
											<Fragment>
												<del>
													<h5 style={{fontSize:"18px"}} >₹ {product?.normal_price}</h5>
												</del>
												<h4 style={{fontSize:"24px"}}  className="mb-3">₹ {product?.sale_price}</h4>
											</Fragment>
										) : (

											<h4  style={{fontSize:"20px"}} className="pb-4 pt-4">₹ {product?.normal_price}</h4>
										)
									}
									{
										currentItem && (
											<div className="qunt-main">
												<div className="quantity">
													<h5>Quantity</h5>
													<QuantityUpdate
														quantity={Number(currentItem?.quantity)}
														id={currentItem?.id}
													/>

												</div>
											</div>
										)
									}



									<div className="add-to-cart-whishlist mt-5">
										<button className="btn-1" onClick={addToCart} disabled={!product}>Add to cart</button>
										<button className="btn-2">
											<img src={nounLove} alt="" />
										</button>
									</div>
									<div className="buy-now-btn mt-4">
										<Link to="/checkout" className='button'>Buy it now</Link>
									</div>

								</div>
							</div>
						</div>
					</div>
				</div>
			</div>


			<div className="container mt-5 mb-5">
				<section id="tabs">
					<nav>
						<div className="nav nav-tabs" id="nav-tab" role="tablist">
							<button className="nav-link active " id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button"
								role="tab" aria-controls="nav-home" aria-selected="false">
								Description
							</button>
							<button className="nav-link " id="nav-luxury-tab" data-bs-toggle="tab" data-bs-target="#nav-luxuryyy"
								type="button" role="tab" aria-controls="nav-luxury" aria-selected="true">
								Customer reviews
							</button>
							<button className="nav-link" id="nav-prestige-tab" data-bs-toggle="tab" data-bs-target="#nav-prestige"
								type="button" role="tab" aria-controls="nav-prestige" aria-selected="false">
								SHIPPING & RETURNS
							</button>
						</div>
					</nav>
					<div className="tab-content" id="nav-tabContent">
						<div className="tab-pane fade show active " id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
							<div className="container mt-4 mb-4">
								<div className="row">
									<div dangerouslySetInnerHTML={{ __html: product?.short_description }} />
								</div>
							</div>
						</div>

						<div className="tab-pane fade " id="nav-luxury" role="tabpanel" aria-labelledby="nav-luxury-tab">
							<div className="container mt-4 mb-4">
								<div className="row">
									Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
									et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum.
									Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit
									amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
									aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd
									gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
									sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore
								</div>
							</div>
						</div>

						<div className="tab-pane fade" id="nav-prestige" role="tabpanel" aria-labelledby="nav-prestige-tab">
							<div className="container mt-4 mb-4">
								<div className="row">
								<br></br>
								<h6 class="pt-4 pb-4" >Returns Policy</h6>
								<br></br>
								<p>You may return most new, unopened items within 2 days of delivery for a full refund. We'll also pay the return shipping costs if the return is a result of our error (you received an incorrect or defective item, etc.)..</p>
								<p>You should expect to receive your refund within four weeks of giving your package to the return shipper, however, in many cases you will receive a refund more quickly. This time period includes the transit time for us to receive your return from the shipper (5 to 10 business days), the time it takes us to process your return once we receive it (3 to 5 business days), and the time it takes your bank to process our refund request (5 to 10 business days).</p>
								<p>If you need to return an item, simply login to your account, view the order using the "Complete Orders" link under the My Account menu and click the Return Item(s) button. We'll notify you via e-mail of your refund once we've received and processed the returned item..</p>
								<br></br>
								<h6 class="pt-4 pb-4">Shipping</h6>
								<br></br>
								<p>We can ship to virtually any address in the world. Note that there are restrictions on some products, and some products cannot be shipped to international destinations..</p>
								<p>When you place an order, we will estimate shipping and delivery dates for you based on the availability of your items and the shipping options you choose. Depending on the shipping provider you choose, shipping date estimates may appear on the shipping quotes page.</p>
								<p>Please also note that the shipping rates for many items we sell are weight-based. The weight of any such item can be found on its detail page. To reflect the policies of the shipping companies we use, all weights will be rounded up to the next full pound..</p>
								
								












								</div>
							</div>
						</div>

					</div>
				</section>
			</div>



			<div className="container mt-5 Related-product-section">
				<h3 style={{fontSize:"24px"}}>Related Products</h3>
				<Link to='/products'>View more</Link>

			</div>
			<div className="container">
				<div className="row text-center mt-2 mb-5">

					{products.length > 0 ? (
						<Fragment>
							{products.map((product, idx) => {
								if (idx < 4) {
									return (
										<Fragment key={idx}>
											<ProductCard product={product} />
										</Fragment>
									)
								}
							})}
						</Fragment>
					) : (
						<div className='alert alert-info'>No product found</div>
					)}

				</div>
			</div>
			<Footer />
		</Fragment>
	)

}

export default ProductDetail