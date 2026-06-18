<script setup>
import { ref } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const username = ref("");
const password = ref("");
const loginError = ref("");

const authStore = useAuthStore();
const router = useRouter();

async function login(){
    loginError.value = "";
    
    const payload = {
        username: username.value,
        password: password.value
    }

    try {
        // ✅ FIXED: Use JWT token endpoint (port 8000, not 3000)
        const response = await fetch("http://localhost:8000/api/token", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok){
            const errorData = await response.json();
            throw new Error(errorData.detail || `Server error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Login response:", data);

        // ✅ The response contains access and refresh tokens
        if(data.access && data.refresh){
            authStore.saveToken(data);
            // Optionally redirect to dashboard
            router.push('/');
        }
            
    } catch (error) {
        loginError.value = error.message || "Login failed. Please check your credentials.";
        console.error("Login error:", error);
    }
}

</script>


<template>
    <form>
        <input type="text" placeholder="Username" v-model="username">
        <input type="password" placeholder="Password" v-model="password">
        <button @click.prevent="login">Login</button>
    </form>
</template>