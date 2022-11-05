/* eslint-disable no-unused-vars */
import saveBtn from 'assets/pictures/awesome-save.svg';
import { Input } from 'components/forms';
import { Field, FormikProvider, useFormik } from "formik";
import { Fragment, useState } from "react";
import { mutate } from 'swr';
import { API_ENDPOINTS, request } from 'utilities';
import notification from 'utilities/notification';
import { toJson } from 'utilities/str';

const AddressForm = ({ editId, data, handleClose }) => {
    const data_address = toJson(data?.address)
    const [initialValues, setInitialValues] = useState({
        title: data?.title || '',
        type: data?.type || '',
        default: true,
        address: data_address?.address || '',
        country: data_address?.country || '',
        state: data_address?.state || '',
        city: data_address?.city || '',
        zip: data_address?.zip || '',
    })

    const onSubmit = (values) => {
        const url = data?.id ? `${API_ENDPOINTS.ADDRESS}/edit/${data?.id}` : API_ENDPOINTS.ADDRESS
        request.post(url, values)
            .then(response => {
                if (response?.success) {
                    notification('success', response?.message)
                    mutate(API_ENDPOINTS.ADDRESS)
                    if (data?.id) {
                        mutate(`${API_ENDPOINTS.ADDRESS}/${data?.id}`)
                    }
                    formik.handleReset()
                    handleClose()
                }
            })
    }

    const formik = useFormik({ initialValues, enableReinitialize: true, onSubmit })

    return (
        <Fragment>
            <FormikProvider value={formik}>
                <form className="checkout-form" onSubmit={formik.handleSubmit}>
                    <div className="checkout-margin">
                        <Field
                            label='Title'
                            type='text'
                            name='title'
                            icon={() => <i className="name-icon" />}
                            variant='2'
                            component={Input}
                        />
                        <Field
                            label='Address Type'
                            type='text'
                            name='type'
                            icon={() => <i className="name-icon" />}
                            variant='2'
                            component={Input}
                        />
                        <Field
                            label='First Name'
                            type='text'
                            name='first_name'
                            icon={() => <i className="name-icon" />}
                            variant='2'
                            component={Input}
                        />

                        <Field
                            label='Last Name'
                            type='text'
                            name='last_name'
                            icon={() => <i className="name-icon" />}
                            variant='2'
                            component={Input}
                        />

                    </div>

                    <div className="checkout-margin ">

                        <Field
                            label='Address'
                            type='text'
                            name='address'
                            icon={() => <i className="address-book-icon" />}
                            variant='2'
                            size='lg'
                            className=" fc-l checkbr"
                            component={Input}
                        />
                        <Field
                            label='Country'
                            type='text'
                            name='country'
                            icon={() => <i className="address-book-icon" />}
                            variant='2'
                            size='lg'
                            className=" fc-l checkbr"
                            component={Input}
                        />
                        {/* <div className="input-icons">
                            <i className="address-book-icon">
                            </i>
                            <input type="text" className=" fc-l checkbr" id="exampleInputName" aria-describedby="emailHelp"
                                placeholder="Address Line 1" required />

                        </div> */}
                    </div>

                    {/* <div className="checkout-margin">

                        <div className="input-icons-checkout">
                            <i className="gender-icon">
                            </i>

                            <div className="form-group">
                                <select className=" fc-checkout checkbr" id="exampleFormControlSelect1" required>
                                    <option>Gender</option>
                                    <option>Male</option>
                                    <option>Female</option>
                                    <option>Other</option>
                                </select>
                            </div>

                        </div>

                        <div className="input-icons-checkout">
                            <i className="phone-icon">
                            </i>
                            <input type="number" className=" fc-checkout checkbr" id="exampleInputName" aria-describedby="emailHelp"
                                placeholder="Phone number" required />

                        </div>

                        <div className="input-icons-checkout">
                            <i className="otp-icon">
                            </i>
                            <input type="email" className=" fc-checkout checkbr " id="exampleInputName" aria-describedby="emailHelp"
                                placeholder="E-mail" required />

                        </div>
                    </div> */}

                    <div className="checkout-margin">

                        <Field
                            label='Pincode'
                            type='text'
                            name='zip'
                            icon={() => <i className="postal-icon" />}
                            variant='2'
                            size='sm'
                            className=" fc-l checkbr"
                            component={Input}
                        />
                        <Field
                            label='City'
                            type='text'
                            name='city'
                            icon={() => <i className="map-icon" />}
                            variant='2'
                            size='sm'
                            className=" fc-l checkbr"
                            component={Input}
                        />
                        <Field
                            label='State'
                            type='text'
                            name='state'
                            icon={() => <i className="city-hall-icon" />}
                            variant='2'
                            size='sm'
                            className=" fc-l checkbr"
                            component={Input}
                        />

                        {/* <div className="input-icons-checkout">
                            <i className="postal-icon">
                            </i>
                            <input type="number" className=" fc-checkout checkbr" id="exampleInputName" aria-describedby="emailHelp"
                                placeholder="Pincode" required />

                        </div> */}

                        {/* <div className="input-icons-checkout">
                            <i className="map-icon">
                            </i>
                            <input type="text" className=" fc-checkout checkbr" id="exampleInputName" aria-describedby="emailHelp"
                                placeholder="City" required />

                        </div> */}

                        {/* <div className="input-icons-checkout">
                            <i className="city-hall-icon">
                            </i>
                            <input type="text" className=" fc-checkout checkbr" id="exampleInputName" aria-describedby="emailHelp"
                                placeholder="State" required />

                        </div> */}
                    </div>

                    <div className="submit-section">
                        <span><div className="form-check">
                            {/* <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" /> */}
                            {/* <label className="form-check-label" for="flexCheckDefault">
                                Ship to a different address
                            </label> */}
                        </div></span>

                        <button type='submit' >
                            <span className="sa-add">
                                <img src={saveBtn} width="15%" alt="" /> Save Address
                            </span>
                        </button>
                    </div>
                </form>
            </FormikProvider>
        </Fragment>
    )
}

export default AddressForm