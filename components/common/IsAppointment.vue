<template>
  <IsAppointment :nameProduct="product" :nameClient="name" :phone="celphone" :whatsapp="true" :call="true" :video="true" :sms="false"/>
</template>

<script>
import { IsAppointment } from "is-appointment"
import M from "materialize-css";

export default {
  data () {
    return {
      name: 'José',
      product: 'Vida',
      celphone: "955539688"
    }
  },
  mounted() {
    M.AutoInit()
  },
  component: {
    IsAppointment
  }
}
</script>

<style lang="scss" >

* {
    padding: 0;
    margin: 0;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
#appointmentComponent .text-blue { color: #0855c4;  }
#appointmentComponent .text-dark { color: #EA0C90; }
#appointmentComponent .text-red { color: red; }
#appointmentComponent .mt-0 {
  margin-top: 0;  
}
#appointmentComponent .mt-1 {
  margin-top: .5rem;  
}
#appointmentComponent .mt-2 {
  margin-top: 1rem;  
}
#appointmentComponent .mt-3 {
  margin-top: 1.5rem;  
}
#appointmentComponent .mt-4 {
  margin-top: 2.5rem;  
}
#appointmentComponent .mt-5 {
  margin-top: 3rem;  
}
#appointmentComponent .mb-0 {
  margin-bottom: 0;  
}
#appointmentComponent .mb-1 {
  margin-bottom: .5rem;  
}
#appointmentComponent .mb-2 {
  margin-bottom: 1rem;  
}
#appointmentComponent .mb-3 {
  margin-bottom: 1.5rem;  
}
#appointmentComponent .mb-4 {
  margin-bottom: 2.5rem;  
}
#appointmentComponent .mb-5 {
  margin-bottom: 3rem;  
}
.valign-wrapper-end {
    display: flex;
    align-items: flex-end;
}
#appointmentComponent .btn, 
#appointmentComponent .btn-large,
#appointmentComponent  .btn-small {
  background-color: #EA0C90;
  width: 12rem;
  color: #fff;
  border-radius: 7px;
  text-transform: initial;
}
#appointmentComponent .box-input {
  margin: 0;
  border: 1px solid #D1D1D1;
  padding: 0 7px;

}
#appointmentComponent .box {
  background-color: #F4F5FA;
  height: 0px;
  bottom: 0px;
  right: 0;
  position: fixed;
  transition-delay: 0.3s;
  transition: 0.5s cubic-bezier(0.445, 0.05, 0.55, 0.95);
  display: flex;
  flex-direction: column;
}
#appointmentComponent .box-active {
  min-height: 100vh;
  width: 100vw;
}
#appointmentComponent .fab {
    position: fixed;
    bottom: 32px;
    right: 32px;
    border-radius: 50%;
    width: 60px;
    height: 60px;
    background: #0855C4;
    box-shadow: 1px 2px 4px grey;
    z-index: 3;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

#appointmentComponent .fab:hover {
    cursor: pointer;
}
#appointmentComponent .fab .text-float {
  display: none;
  background-color: #0855C4;
  color: #fff;
}
#appointmentComponent .fab img {
  width: 100%;
  transition: 0.4s;
  object-fit: cover;
}

#appointmentComponent .fab-active {
    visibility: hidden;
}

#appointmentComponent .fab-active img {
    transform: rotate(270deg);
    width: 0%;
}

#appointmentComponent #contact-top {
  top: 0;
  left: 0;
  height: 158px !important;
  background-color: #0855C4;
  text-align: center;
}

#appointmentComponent #contact-top h5 {
  color: #fff;
  font-weight: 700;
  font-size: 1.3rem;
  margin-top: 7px;
}
#appointmentComponent .div {
  position: absolute;
  width: 100%;
  height: 50%;
}

#appointmentComponent button:focus {outline:0;}
#appointmentComponent #close {
  top: 20px;
  right: 20px;
  width: 30px;
  height: 30px;
  cursor: pointer;
}
#appointmentComponent #close .imgClose {
  width: 14px;
  height: 14px;
  object-fit: cover;
}

#appointmentComponent #optionsAgent {
  top: 135px;
  left: 5%;
  width: 90%;
  height: 100%;
  background-color: #ffffff;
  border-radius: 12px 12px 0px 0px;
  padding-bottom: 3rem;
}

#appointmentComponent #optionsAgent .content-top {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
#appointmentComponent #optionsAgent .options-appointment {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  padding-top: 14px;
}
#appointmentComponent #optionsAgent .button {
  border: none;
  height: 56px;
  margin: 0 7px;
  background: #F4F5FA;
  font-size: 8.5pt;
  color: #454A6C;
  border-radius: 3px;
  padding: 10px 10px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;
}
#appointmentComponent #optionsAgent .button.active {
  background: #0855C4;
  color: #ffffff;
}
#appointmentComponent #optionsAgent  .button img {
  width: 28px;
  height: 28px;
  object-fit: cover;
  border-radius: 100%;
  display: block;
  margin-right: 10px;
  filter: brightness(0.5);
}


#appointmentComponent #optionsAgent .button.active img {
  width: 28px;
  height: 28px;
  object-fit: cover;
  border-radius: 100%;
  display: block;
  margin-right: 10px;
  filter: initial;
}
#appointmentComponent #optionsAgent a.btn-link {
  color: #0855C4;
  font-weight: 200;
  text-align: left;
  text-decoration: none;
}

/*
  Options contact
*/
#appointmentComponent #optionsAgent input,
#appointmentComponent .optionsContact input,
#appointmentComponent .optionsContact input:focus {
  border-bottom: none!important;
  box-shadow: none;
  cursor: pointer;
}
#appointmentComponent .optionsContact input::placeholder {
  color: #000;
}
#appointmentComponent .optionsContact .active h6 {
  color: #EA0C90;
}
#appointmentComponent .optionsContact .active .br-options {
  background-color: #EA0C90;
}
#appointmentComponent .optionsContact .active .br-options img {
  filter: contrast(6);
}
#appointmentComponent .optionsContact .types h6 {
  font-size: .7rem;
}
#appointmentComponent .optionsContact .br-options {
  border-radius: 50%;
  background: #F4F5FA;
  width: 3rem;
  height: 3rem;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
#appointmentComponent .optionsContact .br-options img {
  width: 1.7rem;
}

/*
  CALL ME
*/
#appointmentComponent .callme,
#appointmentComponent .bookappointment {
  padding: 14px 0;
}
#appointmentComponent .callme h5,
#appointmentComponent .bookappointment h5 {
  font-size: 1.25rem;
  font-weight: 500;
}
/*
  BOOK APPOINTMENTE
*/
#appointmentComponent .bookappointment .options-book .hour .input-field { margin: 0; }
#appointmentComponent .bookappointment .options-book .hour select {
    border-radius: 0;
    outline: none;
    height: 3rem;
    width: 100%;
    font-size: 16px;
    margin: 0 0 8px 0;
    padding: 0;
    box-shadow: none;
    border: none;
  }

#appointmentComponent .bookappointment .options-book .box-input {
  display: flex;
  justify-content: space-around;
  align-content: center;
  margin: 0;
  cursor: pointer;
}
/* SHOW CONFIRM */
#appointmentComponent .showConfirm h6 span {
  font-weight: 600;
}
@media (min-width: 575px) {
  #appointmentComponent .fab {
    right: 0rem;
    flex-direction: row;
    width: 17rem;
    background: transparent;
    box-shadow: none;
  }
  #appointmentComponent .fab img {
    width: 5rem;
    height: 5rem;
  }
  #appointmentComponent .fab .text-float {
    display: block;
    padding-top: .5rem;
    padding-bottom: .5rem;
    padding-right: .5rem;
    padding-left: 1.5rem;
    border-top-right-radius: 2rem;
    border-bottom-right-radius: 2rem;
    margin-left: -1rem;
    z-index: -1;
  }
  #appointmentComponent .box {
    right: 5px;
        border-radius: 12px 12px 2px 2px;
  }
  #appointmentComponent .box-active {
    width: 375px;
    height: 625px;
    min-height: 625px;
  }
  #appointmentComponent #contact-top {
    border-radius: 12px  12px  0px 0px;
  }
}


</style>