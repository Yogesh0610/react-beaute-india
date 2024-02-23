import React, { useState } from 'react';
import { FormikProvider, useFormik } from 'formik';
import { useCart, useShop, useUser } from 'hooks';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { clear } from 'store/cart/actions';
import { API_ENDPOINTS, request } from 'utilities';
import notification from 'utilities/notification';
import { toJson } from 'utilities/str';
import DefaultAddressQuery from './DefaultAddressQuery';
import { useNavigate } from "react-router-dom";
import CryptoJS from 'crypto-js';



const OrderForm = () => {
    const navigate = useNavigate();
    const { items, subTotal, total, totalQuantity } = useCart()
    const { isUserLoggedIn, user } = useUser()
    const { info: shop } = useShop()
    const dispatch = useDispatch()
    const { data: defaultAddress } = DefaultAddressQuery()
    const address = toJson(defaultAddress?.address)
    const isDisabled = isUserLoggedIn && totalQuantity > 0
    const [payMethod, setPayMethod] = useState('');
    const [iframeContent, setIframeContent] = useState('');


    const initialValues = {
        "products": items.map(item => ({
            "order_quantity": item?.quantity,
            "product_id": item?.product_id,
            "unit_price": item?.price,
            "subtotal": item?.price * item?.quantity
        })),
        "status": 1,
        "amount": total,
        "sales_tax": 0,
        "coupon_id": 1,
        "shop_id": shop?.id,
        "paid_total": total,
        "total": total,
        "customer_contact": user?.contact || '0123456789',
        "payment_gateway": payMethod,
        "billing_address": {
            "country": address?.country,
            "state": address?.state,
            "zip": address?.zip,
            "city": address?.city,
            "address": address?.address
        },
        "shipping_address": {
            "country": address?.country,
            "state": address?.state,
            "zip": address?.zip,
            "city": address?.city,
            "address": address?.address
        }
    }


    const onSubmit = (values) => {
        request.post(API_ENDPOINTS.ORDER, values)
            .then(response => {
                if (response?.success) {
                    notification('success', response?.message)
                    dispatch(clear())
                }
            })
    }

    // rzp_test_9rOLNbfeH7Rmrw
    // dS9VvDqnRVwf2dXgQgN1rnsg

    const formik = useFormik({ initialValues, enableReinitialize: true, onSubmit })


    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement('script')
            script.src = src
            script.onload = () => {
                resolve(true)
            }
            script.onerror = () => {
                resolve(false)
            }
            document.body.appendChild(script)
        })
    }

    async function displayRazorpay() {
        const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js')

        if (!res) {
            alert('Razorpay SDK failed to load. Are you online?')
            return
        }

        // const data = await fetch('http://localhost:3003/api/razorpay', { method: 'GET' }).then((t) =>
        // 	t.json()
        // )



        const options = {
            key: 'rzp_test_1DKpSUIdqguma0',
            currency: "INR",
            amount: (initialValues.total) * 100,
            // order_id: "10199",
            name: 'BEAUTE INDIA',
            description: 'Thank you for Purchasing',
            // image: 'http://localhost:1337/logo.svg',
            handler: function (response) {

                // console.warn("razorpay_payment_id", response.razorpay_payment_id)
                if (response.razorpay_payment_id) {
                    setTimeout(() => {
                        alert("Payment Done Successfully")
                        navigate("/products");
                    }, 1000);
                }
                // alert(response.razorpay_payment_id)
                // alert(response.razorpay_order_id)
                // alert(response.razorpay_signature)
            },
            prefill: {
                name: user.name,
                email: user.email,
                phone_number: user.customer_contact
            }
        }
        const paymentObject = new window.Razorpay(options)
        // console.warn("paymentObject", paymentObject);
        paymentObject.open()
    }
    // Function to encrypt plaintext
    const encryptText = (plainText, workingKey) => {
        const encrypted = CryptoJS.AES.encrypt(plainText, workingKey).toString();
        return encrypted;
    };

    // Function to decrypt ciphertext
    const decryptText = (cipherText, workingKey) => {
        const decrypted = CryptoJS.AES.decrypt(cipherText, workingKey).toString(CryptoJS.enc.Utf8);
        return decrypted;
    };

    const merchant_id = '3193482';
    const accessCode = 'AVKT50LA58BL10TKLB'

    const handleCCAvenuePayment = async () => {
        try {
            const body = {
                merchant_id: merchant_id,
                billing_name: user.name,
                billing_address: initialValues.billing_address.address,
                billing_city: initialValues.billing_address.city,
                billing_state: initialValues.billing_address.state,
                billing_zip: initialValues.billing_address.zip,
                billing_country: initialValues.billing_address.country,
                billing_tel: user.customer_contact,
                billing_email: user.email,
                amount: initialValues.amount,
                currency: 'INR',
                language: 'EN',
                integration_type: 'iframe_normal',
                redirect_url: '/checkout',
                cancel_url: '/checkout',
                order_id: '12348485',
                submit: 'Checkout'
            };

            const encRequest = encryptText(JSON.stringify(body), '0F5812A5D3771FD937230291E33AAB7E');

            const formbody = `
                <html>
                <head>
                    <title>Sub-merchant checkout page</title>
                    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
                </head>
                <body>
                    <center><!-- width required mininmum 482px -->
                        <iframe width="482" height="500" scrolling="No" frameborder="0" id="paymentFrame" 
                            src="https://test.ccavenue.com/transaction/transaction.do?command=initiateTransaction&
                            merchant_id=${merchant_id}&encRequest=${encRequest}&access_code=${accessCode}">
                        </iframe>
                    </center>
                    <script type="text/javascript">
                        $(document).ready(function(){
                            $("iframe#paymentFrame").load(function() {
                                window.addEventListener("message", function(e) {
                                    $("#paymentFrame").css("height", e.data["newHeight"] + "px");
                                }, false);
                            });
                        });
                    </script>
                </body>
                </html>`;
            const popupWindow = window.open('', '_blank', 'width=600,height=600');
            popupWindow.document.write(formbody);
            // setIframeContent(formbody);
        } catch (error) {
            // console.error('Error processing payment:', error);
            notification('error', error);
            return ''; // Return an empty string in case of error
        }
    };



    return (
        <Fragment>
            <FormikProvider value={formik}>
                <div dangerouslySetInnerHTML={{ __html: iframeContent }} />
                {/* <form > */}
                <div className="payment-optoin-section">
                    <div className="row pt-5 pb-5">
                        <div className="col-lg-8">
                            <h2>Payment Option</h2>
                            <div className="choose-payment-mode mt-5 pe-5">
                                <ul>
                                    <div className="radio-btn-section pe-3">
                                        <li>Razor pay </li>
                                        <div className="form-check">
                                            <label className="form-check-label" for="razorPay">
                                                <input className="form-check-input" type="radio" name="payment_gateway" id="razorPayoption"
                                                    value="razorPay"
                                                    checked={payMethod === 'razorPay'}
                                                    onChange={(e) => setPayMethod(e.currentTarget.value)}
                                                />
                                            </label>
                                        </div>
                                    </div>

                                    <hr />
                                    <div className="radio-btn-section pe-3">
                                        <li>Cash on delivery</li>

                                        <div className="form-check">
                                            <label className="form-check-label" for="CASH_ON_DELIVERY">
                                                <input className="form-check-input" type="radio" name="payment_gateway" id="CASH_ON_DELIVERY"
                                                    value="CASH_ON_DELIVERY"
                                                    checked={payMethod === 'CASH_ON_DELIVERY'}
                                                    onChange={(e) => setPayMethod(e.currentTarget.value)}
                                                />
                                            </label>

                                        </div>
                                    </div>
                                    <hr />
                                    <div className="radio-btn-section pe-3">
                                        <li>Pay with CCAVENUE</li>

                                        <div className="form-check">
                                            <label className="form-check-label" for="CCAVENUE">
                                                <input
                                                    className="form-check-input"
                                                    id="CCAVENUE"
                                                    type="radio"
                                                    name="payment_gateway"
                                                    value="CCAVENUE"
                                                    checked={payMethod === 'CCAVENUE'}
                                                    onChange={() => setPayMethod('CCAVENUE')}
                                                />

                                            </label>

                                        </div>
                                    </div>
                                    <hr />
                                    {/* <div className="radio-btn-section pe-3">
                                            <li>UPIs</li>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="payment_gateway" id="UPIs" 
                                                    value="UPIs"
                                                    checked={payMethod === 'UPIs'}
                                                    onChange={(e) => setPayMethod(e.currentTarget.value)}
                                                 />
                                                <label className="form-check-label" for="UPIs">

                                                </label>
                                            </div>
                                        </div> */}

                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="total-section">
                                <h1 style={{ fontSize: "26px" }} className="mb-5"> <u> Total</u></h1>
                                <div className="total-products">
                                    {items.map((item, idx) => (
                                        <div className="product-price" key={idx}>
                                            <h5 style={{ fontSize: "18px" }}>{item?.model?.name}</h5>
                                            <span style={{ fontSize: "18px" }}>₹ {item?.price * item?.quantity}</span>
                                        </div>
                                    ))}


                                    <div className="mb-2 mt-4">
                                        <div className="new2"></div>
                                    </div>
                                    <div className="product-price">
                                        <h5 style={{ fontSize: "20px !important" }}>Sub Total</h5><span style={{ fontSize: "20px" }}>₹ {subTotal}</span>
                                    </div>
                                    <p>including ({(subTotal * 18) / 100}) in taxes</p>
                                </div>
                                {payMethod === 'razorPay' ?
                                    <button type='button' onClick={displayRazorpay} disabled={!isDisabled} className="payment-btn mt-5">Proceed to Razorpay Payment</button>
                                    : payMethod === 'CCAVENUE' ?
                                        <button type='button' onClick={handleCCAvenuePayment} disabled={!isDisabled} className="payment-btn mt-5">Proceed to CCAvenue Payment</button>
                                        :
                                        <button type='submit' disabled={!isDisabled} onClick={formik.handleSubmit} className="payment-btn mt-5">Proceed to Payment</button>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                {/* </form> */}
            </FormikProvider>
        </Fragment>
    )
}

export default OrderForm
