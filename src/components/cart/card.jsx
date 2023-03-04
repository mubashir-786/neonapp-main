import axios from "axios";
import React, { useState } from "react";

export default function Card({ val, cartItems }) {
  const [cardname, setCardName] = useState();
  const [cardnumber, setCardNumber] = useState();
  const [carddate, setCardExpriryDate] = useState();
  const [cardYear, setCardExpriryYear] = useState();
  const [cardCvc, setCardCvc] = useState();

  console.log("adgsd ", val);

  const onSubmit = async () => {
    if (cardnumber.length === 13 && cardCvc.length === 2, cardYear ,carddate ) {
      try {
        for (let i = 0; i < cartItems.length; i++) {
          const isNotCustom = cartItems[i].name ? true : false;

          const response = await axios.post(
            "http://35.74.25.58/api/generate_payment_intent",
            isNotCustom
              ? {
                  product_id: cartItems[i].id,
                  email: val.email,
                  firstName: val.firstName,
                  streetAddress: val.streetAddress,
                  country: val.country,
                  state: val.street,
                  city: val.city,
                  postalCode: val.postalCode,
                  phoneNumber: val.phoneNumber,
                  number: cardnumber,
                  exp_month: carddate,
                  exp_year: cardYear,
                  cvc: cardCvc,
                }
              : {
                  // amount: "100", product id ,
                  type: "custom",
                  image: cartItems[i].img,
                  color: cartItems[i].color,
                  price: cartItems[i].price,
                  email: val.email,
                  firstName: val.firstName,
                  streetAddress: val.streetAddress,
                  country: val.country,
                  state: val.street,
                  city: val.city,
                  postalCode: val.postalCode,
                  phoneNumber: val.phoneNumber,
                  number: cardnumber,
                  exp_month: carddate,
                  exp_year: cardYear,
                  cvc: cardCvc,
                }
          );

          const res = await axios.post("http://35.74.25.58/api/payment", {
            pi: response.data,
          });
          console.log("2nd--->", res);
          const { paymentIntent } = confirmPayment;
          if (paymentIntent.status === "succeeded") alert(`Payment successful!`);
          else alert(`Payment failed!`);
        }

        // const response = await axios.post("http://35.74.25.58/api/generate_payment_intent",
        // // isNotCustom ?

        // {
        //     product_id: 3,
        //     email: val.email,
        //     firstName: val.firstName,
        //     streetAddress: val.streetAddress,
        //     country: val.country,
        //     state: val.street,
        //     city: val.city,
        //     postalCode: val.postalCode,
        //     phoneNumber: val.phoneNumber,
        //     number: cardnumber,
        //     exp_month: carddate,
        //     exp_year: cardYear,
        //     cvc: cardCvc
        // }
        // //  :
        // // {
        // //     // amount: "100", product id ,
        // //     type: "custom",
        // //     image : "",
        // //     color:"",
        // //     price:"",

        // //     email: val.email,
        // //     firstName: val.firstName,
        // //     streetAddress: val.streetAddress,
        // //     country: val.country,
        // //     state: val.street,
        // //     city: val.city,
        // //     postalCode: val.postalCode,
        // //     phoneNumber: val.phoneNumber,
        // //     number: cardnumber,
        // //     exp_month: carddate,
        // //     exp_year: cardYear,
        // //     cvc: cardCvc
        // // }

        // )
        // console.log("first-->", response.data);
        // const res = await axios.post("http://35.74.25.58/api/payment", {
        //   pi: response.data,
        // });
        // console.log("2nd--->", res);
        // const { paymentIntent } = confirmPayment;
        // if (paymentIntent.status === "succeeded") alert(`Payment successful!`);
        // else alert(`Payment failed!`);
      } catch (err) {
        console.error(err);
      }
    }
    else alert(`Please Fill All The Feilds`);
  };
  return (
    <div>
      <div class="min-w-screen min-h-screen bg-gray-200 flex items-center justify-center px-5 pb-10 pt-16">
        <div
          class="w-full mx-auto rounded-lg bg-white shadow-lg p-5 text-gray-700"
          style={{ maxWidth: 600 }}
        >
          <div class="w-full pt-1 pb-5">
            <div class="bg-indigo-500 text-white overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center">
              <i class="mdi mdi-credit-card-outline text-3xl"></i>
            </div>
          </div>
          <div class="mb-10">
            <h1 class="text-center font-bold text-xl uppercase">
              Secure payment info
            </h1>
          </div>
          <div class="mb-3 flex -mx-2"></div>
          <div class="mb-3">
            <label class="font-bold text-sm mb-2 ml-1">Name on card</label>
            <div>
              <input
                class="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="John Smith"
                type="text"
              />
            </div>
          </div>
          <div class="mb-3">
            <label class="font-bold text-sm mb-2 ml-1">Card number</label>
            <div>
              <input
                class="w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="0000 0000 0000 0000"
                type="number"
                maxLength={14}
                onChange={(e) => {
                  cardnumber.length > 13 ? setCardNumber(e.target.value) : null;
                }}
              />
            </div>
          </div>
          <div class="mb-3 -mx-2 flex items-end">
            <div class="px-2 w-1/2">
              <label class="font-bold text-sm mb-2 ml-1">Expiration date</label>
              <div>
                <select
                  class="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                  onChange={(e) => setCardExpriryDate(e.target.value)}
                >
                  <option value="01">01 - January</option>
                  <option value="02">02 - February</option>
                  <option value="03">03 - March</option>
                  <option value="04">04 - April</option>
                  <option value="05">05 - May</option>
                  <option value="06">06 - June</option>
                  <option value="07">07 - July</option>
                  <option value="08">08 - August</option>
                  <option value="09">09 - September</option>
                  <option value="10">10 - October</option>
                  <option value="11">11 - November</option>
                  <option value="12">12 - December</option>
                </select>
              </div>
            </div>
            <div class="px-2 w-1/2">
              <select
                class="form-select w-full px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors cursor-pointer"
                onChange={(e) => {
                  setCardExpriryYear(e.target.value);
                }}
              >
                <option value="2020">2020</option>
                <option value="2021">2021</option>
                <option value="2022">2022</option>
                <option value="2023">2023</option>
                <option value="2024">2024</option>
                <option value="2025">2025</option>
                <option value="2026">2026</option>
                <option value="2027">2027</option>
                <option value="2028">2028</option>
                <option value="2029">2029</option>
              </select>
            </div>
          </div>
          <div class="mb-10">
            <label class="font-bold text-sm mb-2 ml-1">CVC</label>
            <div>
              <input
                class="w-32 px-3 py-2 mb-1 border-2 border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                placeholder="000"
                type="text"
                onChange={(e) => setCardCvc(e.target.value)}
              />
            </div>
          </div>
          <div>
            <button
              onClick={onSubmit}
              class="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 border-2 border-black rounded-lg px-3 py-3 font-semibold"
            >
              <i class="mdi mdi-lock-outline mr-1"></i> PAY NOW
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
