<template>
    <div class="main-div">
        <nav-bar></nav-bar>
        <div class="main-content">
            <b-row class="main-row justify-content-md-center">
                <b-col sm="4">
                    <thank-you></thank-you>
                </b-col>
            </b-row>
        </div>
    </div>
</template>

<script>
    import NavBar from "../NavBar"
    import ThankYou from "../ThankYou"
    export default {
        data() {
            return {
            }
        },
        mounted() {
            let role = localStorage.role;
            if (role == 'oka') {
                this.$router.push('/oka/upload-infaq');
            }
            if (role == 'admin') {
                this.$router.push('/admin/summary');
            }
        },
        components: {NavBar, ThankYou}
    }
</script>

<style scoped>
    .main-row {
        margin-right: 0; 
        margin-left: 0
    }
    
    @media screen and (min-width: 540px) {
        .main-div {
            background-color: #f2f3f4;
            height: 100%;
            padding-bottom: 100px;
            overflow-y: auto;
            overflow-x: hidden;
        }
        .main-row {
            margin-top: 70px;
        }
    }
    @media screen and (min-width: 1366px) {
        .main-content {
            width: 1366px;
            margin: auto;
        }        
    }
</style>
