import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import axios from "axios"
import React, { useState } from 'react'


const CARD_OPTIONS = {
    iconStyle: "solid",
    style: {
        base: {
            iconColor: "#c4f0ff",
            fontWeight: 500,
            fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
            fontSize: "16px",
            fontSmoothing: "antialiased",
            ":-webkit-autofill": { color: "#fce883" },
            "::placeholder": { color: "#87bbfd" }
        },
        invalid: {
            iconColor: "#ffc7ee",
            color: "#ffc7ee"
        }
    }
}

export default function PaymentForm(amount) {
    const [success, setSuccess] = useState(false)

    const stripe = useStripe()
    const elements = useElements()

    const handleSubmit = async (e) => {

        e.preventDefault()
        // const response = await axios.post("http://35.74.25.58/api/generate_payment_intent", {
        //                 amount: amount.amount,
        //                 paymentMethod: 'card',
        //             })
        //             console.log(response.data)
                    try {
                        const response = await axios.post("http://35.74.25.58/api/generate_payment_intent", {
                            amount: amount.amount,
                            paymentMethod: 'card',
                        })
                        console.log("first-->",response.data)
                        const cardElement = elements.getElement(CardElement);
                        const confirmPayment = await stripe.confirmCardPayment(
                            response.data.seceret
                            ,
                          { payment_method: { card: cardElement } }
                        );
                        console.log("sec->",confirmPayment);
                        const { paymentIntent } = confirmPayment;
                        if (paymentIntent.status === "succeeded") alert(`Payment successful!`);
                        else alert(`Payment failed!`);
                      } catch (err) {
                        console.error(err);
                      }
        // const { error, paymentMethod } = await stripe.confirmCardPayment({
        //     type: "card",
        //     card: elements.getElement(CardElement),
        // })
        // console.log("stripe-->", paymentMethod)
        // if (!error) {
        //     try {

        //         const response = await axios.post("http://35.74.25.58/api/generate_payment_intent", {
        //             amount: amount.amount,
        //             paymentMethod: 'card',
        //             name:"xyz",
        //             email:'xddhcjnyrz@example.com',
        //         })
        //         console.log("2nd", response)

        //         if (response.data) {

        //             const res = await axios.post("http://35.74.25.58/api/payment", {
        //                 pi: response.data.payment_intent,
        //                 pm: paymentMethod.id,
        //                 customer: response.data.customer,
        //             })
        //             console.log("3rd-->", res)
        //             if (res.data) {
        //                 if (res.data.status == "requires_action") {
        //                     const resp = await axios.post("http://35.74.25.58/api/td_secure_payment", {
        //                         pi: response.data.payment_intent,
        //                         return_url: res.data.next_action.use_stripe_sdk.stripe_js,
        //                         pm: paymentMethod.id,
        //                     })
        //                     // console.log("res-4", resp)
        //                     console.log("-->4rd", resp)
        //                     console.log("url", resp.data.next_action.redirect_to_url.url)
        //                     // window.location = res.data.next_action.use_stripe_sdk.stripe_js

        //                     window.location = resp.data.next_action.redirect_to_url.url;
        //                     // console.log("res-4", resp)
        //                     console.log("Successful payment")
        //                     setSuccess(true)
        //                 }

        //             }
        //         }

        //     } catch (error) {
        //         console.log("Error", error)
        //     }
            // if (pi && pm) {
            //     try {
            //         console.log(pi, pm)
            //         const response = await axios.post("http://35.74.25.58/api/payment", {
            //             pi,
            //             pm
            //         })
            //         console.log("3rd-->", response)
            //         if (response.data) {
            //             if (response.data.status == "requires_action") {
            //                 const resp = await axios.post(response.data.next_action.use_stripe_sdk.stripe_js)
            //                 console.log("res-4", resp)
            //                 console.log("Successful payment")
            //                 console.log(pi, pm)
            //                 setSuccess(true)
            //             }

            //         }

            //     } catch (error) {
            //         console.log("Error", error)
            //     }
            // }else{
            //     console.log("id not found")
            // }

        // } else {
        //     console.log(error.message)
        // }
    }

    return (
        <>

            <form >
                <fieldset className="FormGroup">
                    <div className="FormRow">
                        <CardElement options={CARD_OPTIONS} />
                    </div>
                </fieldset>
                <button onClick={handleSubmit}>Pay</button>
            </form>

        </>
    )
}