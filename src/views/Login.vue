<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { login } from '@/services/accountService';


const router = useRouter();

const state = reactive ({
    form: {
        loginId: '',
        password: ''
    }
});
const submit = async () => {
    const res = await login(state.form);

    switch(res.status) {
        case 200 :
            await router.push('/');
            break;
        case 404 :
            alert('아이디/비밀번호를 확인해주세요.');
            break;
    }
}
</script>

<template>
    <h1>로그인</h1>
<div class="login">
        <div class="container">
            <form class="py-5 d-flex flex-column gap-3" @submit.prevent="submit">
                <h1 class="h5 mb-3">로그인</h1>
                <div class="form-floating">
                <input type="text" class="form-control" id="loginId" placeholder="아이디" v-model="state.form.loginId">
                <label for="loginId">아이디</label>
            </div>
            <div class="form-floating">
                <input type="password" class="form-control" id="password" placeholder="패스워드" v-model="state.form.password" autocomplete="off">
                <label for="password">패스워드</label>
            </div>
            <button class="w-100 h6 btn py-3 btn-primary">로그인</button>
        </form>
        <router-link to="/id">아이디찾기</router-link>
        <router-link to="/renewal">비밀번호변경</router-link>
        </div>
    </div>
</template>

<style scoped>
.container { max-width: 576px;}
</style>