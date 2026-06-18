<template>
  <div class="container">
    <h1>Lista Utenti</h1>
    <table>
      <thead>
        <tr>
          <th>N°</th>
          <th>ID</th>
          <th>Username</th>
          <!-- <th>Password</th> -->
          <th>Role</th>
          <!-- <th>Email</th> -->
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, i) in users" :key="user.id">
          <td>{{ i + 1 }}</td>
          <td>{{ user.id }}</td>
          <td>{{ user.username }}</td>
          <!-- <td>{{ user.password }}</td> -->
          <!-- <td>{{ user.eta }}</td>
                    <td>{{ user.email }}</td> -->
          <td>
            <select v-model="user.role_id" @change="updateUserRole(user)" class="select">
              <option disabled value="">seleziona il ruolo</option>
              <option value="1">Admin</option>
              <option value="2">User</option>
              <option value="3">Guest</option>
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { response } from 'express'
import { ref } from 'vue'
const selected = ref('')

const updateUserRole = async (user: User) => {
  const payload = { role_id: user.role_id.valueOf() }
  console.log('payload role', payload)
  try {
    const res = await fetch(`http://localhost:3000/api/users/${user.id}`, {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      throw new Error(`Errore nel server: ${res.status}`)
    }
    const data = await res.json()
    console.log('data role', data)
  } catch (error) {
    console.error(`Error: ${error}`)
  }
}

interface User {
  id: number
  username: string
  password: string
  role_id: number
  // cognome: string
  // nome: string
  // eta: number
  // email: string
}

const { users } = defineProps<{ users: User[] }>()
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

table {
  background-color: #55d69c;
  border-collapse: collapse;
  border-radius: 10px;
}

th,
td {
  padding: 8px;
  border: 1px solid white;
}

.select {
  padding: 2px;
  border-radius: 5px;
  cursor: pointer;
}
</style>
