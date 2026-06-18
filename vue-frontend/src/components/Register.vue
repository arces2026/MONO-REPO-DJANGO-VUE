<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const email = ref('')
const registrationMessage = ref('')
const registrationError = ref('')

// async function register() {
//   const payload = {
//     username: username.value,
//     password: password.value,
//   }
//   console.log('payload', payload)
//   try {
//     const response = await fetch('http://localhost:3000/api/register', {
//       method: 'POST',
//       headers: {
//         'Content-type': 'application/json',
//       },
//       body: JSON.stringify(payload),
//     })

//     if (!response.ok) {
//       throw new Error(`Errore del server ${response.status}`)
//     }

//     const data = await response.json()

//     if (data) {
//       console.log('data', data)
//       successMessage = `Utente ${username.value} registrato con successo.`
//       username.value = ''
//       password.value = ''
//       return data
//     }
//   } catch (error) {
//     console.error('Errore', error)
//   }
// }

// New registration function with DRF
const register = async () => {
  registrationMessage.value = ''
  registrationError.value = ''
  
  const payload = {
    username: username.value,
    password: password.value,
    email: email.value || ''
  }
  
  try {
    const response = await fetch("http://localhost:8000/api/register/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    
    const data = await response.json();
    
    if (response.ok) {
      registrationMessage.value = `✅ User ${data.username} registered successfully!`
      username.value = ''
      password.value = ''
      email.value = ''
      console.log('Registration success:', data)
    } else {
      // Handle validation errors from DRF
      if (data.username) {
        registrationError.value = `Username: ${data.username.join(', ')}`
      } else if (data.password) {
        registrationError.value = `Password: ${data.password.join(', ')}`
      } else if (data.email) {
        registrationError.value = `Email: ${data.email.join(', ')}`
      } else {
        registrationError.value = data.detail || 'Registration failed'
      }
      console.error('Registration failed:', data)
    }
    
  } catch (error) {
    registrationError.value = `Network error: ${error.message}`
    console.error("Error:", error)
  }
}
</script>

<template>
  <form>
    <input type="text" placeholder="Username" v-model="username" />
    <input type="password" placeholder="Password" v-model="password" />
    <button @click.prevent="register">Register</button>
    <p>{{ successMessage }}</p>
  </form>
</template>
