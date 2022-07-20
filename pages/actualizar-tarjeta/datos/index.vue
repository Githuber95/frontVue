<template lang="pug">
	.datosCliente
		b-container
			b-row.justify-content-center
				b-col.mt-4(cols='6' sm="5" lg="3" xl="4")
					.text-center
						stepper.px-xl-3(:step="'poliza'")
		b-container.mt-2.mt-lg-5
			b-row.justify-content-center
				b-col(cols="10" lg="6")
					h3.text-center.omnes-medium Actualiza el medio de <br>pago de tu póliza
			b-row.justify-content-center
				b-col(cols="12" lg="6")
					.input-field
						b-form-input#numeroPoliza(ref="numeroPoliza" type="text" placeholder="Ingrese tu N° de póliza" autocomplete="off" @keyup.enter="goPay" :maxLength="11" @blur="$v.poliza.$touch" :state="$v.poliza.$dirty ? !$v.poliza.$error : null" aria-describedby="polizaFeedback" v-model="poliza")
						b-form-invalid-feedback#polizaFeedback(v-if="!$v.poliza.required && $v.poliza.$error")
							| Este campo es requerido
						b-form-invalid-feedback#polizaFeedback(v-if="!$v.poliza.minLenght")
							| Este campo es requerido
			b-row.justify-content-center
				b-col.text-center.mt-3(cols="12" lg="6")
					b-button#btn-guardar.omnes-medium(variant="dark" @click="goPay" :class="[(!$v.poliza.$error) ? '' : 'disabled']") CONTINUAR			
</template>

<script>
import { validationMixin } from 'vuelidate'
import { required, minLenght } from 'vuelidate/lib/validators'

import Stepper from '@/components/common/StepperUpdatePay.vue'
import Swal from 'sweetalert2'
export default {
		layout: 'updateCard',
		data: function () {
				return {
					poliza: '',
					timeout: null
				}
		},
		validations: {
			poliza: {
				required,
				minLenght: 11
			}
		},
		mounted () {
			this.$refs.numeroPoliza.focus()
		},
		methods: {
			goPay () {
				if (this.poliza.length === 11) {
					let self = this
					clearTimeout(this.timeout)
					self.validatePoliza()
				} else {
					Swal.fire(
						'Oops...!',
						'Ingrese un número de poliza correcto',
						'error'
					)
				}
			},
			validatePoliza () {
				this.$store.dispatch('payment/getPoliza', this.poliza).then(respuesta => {
					if (respuesta.data) {
						this.$nuxt.$router.push({
							path: '/actualizarTarjeta/pago'
						})
						this.$nuxt.$emit('show-loader', {
							text: 'Estamos obteniendo tus datos...'
						})
					} else {
						Swal.fire(
							'Oops...!',
							'El número ' + this.poliza + ' no existe',
							'error'
						)
					}
				}, res => {
					if (res.status === 200)  {
						Swal.fire(
							'Oops...!',
							'El número ' + this.poliza + ' no existe',
							'error'
						)
					} else {
						Swal.fire(
							'Oops...!',
							'Estamos teniendo problemas para obtener los datos de su póliza. Para mayor información puedes comunicarte al +51 933559693',
							'error'
						)
					}
				})
			}
		},
		watch: {
			'poliza': function (val) {
				let self = this
				if (val.length === 11) {
					clearTimeout(this.timeout);
					this.timeout = setTimeout(function () {
						self.validatePoliza()
					}, 1300);
				}
			}
		},
		mixins: [
			validationMixin
		],
		components: {
			Stepper
		}
}
</script>
