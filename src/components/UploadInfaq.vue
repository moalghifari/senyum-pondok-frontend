<template>
    <div class="form-box">
        <h5>
            Upload Infaq Anda
        </h5>
        <b-form @submit="onSubmit">
            <b-form-group 
                id="input-group-2"
                label-cols="12"
                label="Nominal infaq"
                label-for="input-2"
                >
                <currency-formatter id="input-2"  v-model="form.nominal" placeholder="Nominal infaq"></currency-formatter>
            </b-form-group>

            <b-form-group 
                id="input-group-3"
                label-cols="12"
                label="Periode"
                label-for="bulan"
                >
                <b-row>
                    <b-col cols="7">
                        <b-form-select
                            class="mb-2 mr-sm-2 mb-sm-0"
                            v-model="form.month"
                            :options="month_option"
                            required
                            id="bulan"
                            style="border-radius: 3px; font-size: 0.9rem;"
                            >
                        </b-form-select>
                    </b-col>
                    <b-col cols="5" style="padding-left: 0">
                        <b-form-input 
                            type="number"
                            id="year" 
                            v-model="form.year"
                            required
                            style="border-radius: 3px; font-size: 0.9rem;"
                            >
                        </b-form-input>
                    </b-col>
                </b-row>
            </b-form-group>
            
            <b-form-group 
                id="input-group-4"
                class="uploader"
                >
                <image-uploader
                    :preview="true"
                    :className="['fileinput', { 'fileinput--loaded': hasImage }]"
                    :debug="0"
                    :maxWidth="1024"
                    outputFormat="blob"
                    @input="setImage"
                >
                <label for="fileInput" slot="upload-label">
                    <div >
                        <figure style="margin: 0">
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            >
                            <path
                                class="path1"
                                d="M9.5 19c0 3.59 2.91 6.5 6.5 6.5s6.5-2.91 6.5-6.5-2.91-6.5-6.5-6.5-6.5 2.91-6.5 6.5zM30 8h-7c-0.5-2-1-4-3-4h-8c-2 0-2.5 2-3 4h-7c-1.1 0-2 0.9-2 2v18c0 1.1 0.9 2 2 2h28c1.1 0 2-0.9 2-2v-18c0-1.1-0.9-2-2-2zM16 27.875c-4.902 0-8.875-3.973-8.875-8.875s3.973-8.875 8.875-8.875c4.902 0 8.875 3.973 8.875 8.875s-3.973 8.875-8.875 8.875zM30 14h-4v-2h4v2z"
                            ></path>
                            </svg>
                        </figure>
                        <span class="upload-caption" style="font-size: 12px">{{
                            hasImage ? "Ganti bukti transfer" : "Upload bukti transfer"
                        }}</span>
                    </div>
                </label>
                </image-uploader>
           </b-form-group>

            <b-button block type="submit" style="background-color: #d71149; border-color:  #d71149; border-radius: 3px">
                <div v-if="!loading">
                    KIRIM
                </div>
                <b-spinner v-else style="width: 1rem; height: 1rem;"  label="Loading"></b-spinner>
            </b-button>

        </b-form>
    </div>
</template>

<script>
import CurrencyFormatter from "./CurrencyFormatter"
import axios from 'axios'

export default {
    props: ["value"],
    data() {
        return {
            form: {
                nominal: '',
                month: new Date().getMonth() + 1,
                year: new Date().getFullYear()
            },
            hasImage: false,
            image: null,
            showMessage: false,
            message: '',
            loading: false,
            month_option: [ 
                { value: 1, text: 'Januari'},
                { value: 2, text: 'Februari'},
                { value: 3, text: 'Maret'},
                { value: 4, text: 'April'},
                { value: 5, text: 'Mei'},
                { value: 6, text: 'Juni'},
                { value: 7, text: 'Juli'},
                { value: 8, text: 'Agustus'},
                { value: 9, text: 'September'},
                { value: 10, text: 'Oktober'},
                { value: 11, text: 'November'},
                { value: 12, text: 'Desember'}
            ]
            
        }
    },
    methods: {
        onSubmit(evt) {
            evt.preventDefault();
            if (!this.form.nominal) {
                document.getElementById("input-6a").focus()
                return
            }
            if (!this.image) {
                return
            }

            this.loading = true
            let access_token = localStorage.access_token;
            let fd = new FormData()
            fd.append('image', this.image)
            fd.append('nominal', this.form.nominal)
            fd.append('month_year', this.form.year + '-' + this.form.month)
            const path = process.env.VUE_APP_BASE_API + 'transaction/create';
            axios.post(path, fd, {
                headers: {
                    Authorization: access_token,
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(response => {
                this.message = "Infaq berhasil disubmit. Tim kami akan segera menghubungi Anda jika infaq Anda sudah diverifikasi :)"
                this.showMessage = true
                this.loading = false
                this.$emit('input', this.message)
            })
            .catch(err => {
                if (err.response['status'] == "403") {
                    localStorage.access_token = ''
                    localStorage.role = ''
                    this.message = "Upload infaq gagal. Sesi login telah berakhir"
                } else {
                    this.message = "Upload infaq gagal. Coba beberapa saat lagi. Hubungi teknis (087848471386)"
                }
                this.showMessage = true
                this.loading = false
                this.$emit('input', this.message)
            })
        },
        setImage: function(output) {
            this.hasImage = true;
            this.image = output;
        }
    },
    components: {CurrencyFormatter}
}
</script>

<style>
    .form-box {
        margin: auto;
        margin-top: 30px;
        width: 80%;
        padding: 10px;
        overflow: auto;
    }

    .form-box > h5 {
        text-align: left; margin: 0px; margin-bottom: 20px;
    }

    @media screen and (min-width: 540px) {
        .form-box {
            display: block;
            margin: auto;
            width: 80%;
            background-color: #fff;
            border-radius: 3px;
            box-shadow: 0 1px 3px rgba(0,0,0,.12), 0 1px 2px rgba(0,0,0,.24);
            padding: 30px;
        }
        .form-box > h5 {
            text-align: center; margin: 20px; margin-bottom: 30px;
        }
    }
    #fileInput {
        display: none;
    }
    .uploader {
        border: 1px solid #ced4da;
        border-radius: 3px;
        text-align: center;
    }
    label {
        display: block;
    }
    img {
        width: 100%;
        height: 100%;
        object-fit: cover; /*magic*/
    }
</style>
