<script setup>
import { ref } from 'vue'
const libri = ref('')
const keys = ref('')

const getLibri = async () => {
  try {
    const res = await fetch('http://localhost:8000/api/libri/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`)
    }
    const data = await res.json()
    keys.value = Object.keys(data.results[0])
    
    libri.value = data.results
    console.log(data.results)
  } catch (err) {
    console.error(`Error trying to fetch libri: ${err}`)
  }
}
</script>

<template>
  <button @click="getLibri">Get Libri</button>
  <div></div>
  <table>
    <thead>
      <tr>
        <th v-for="key in keys" :key="key">{{ key }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="libro in libri" :key="libro.id">
        <td>{{ libro.id }}</td>
        <td>{{ libro.titolo }}</td>
        <td>{{ libro.anno }}</td>
        <td>{{ libro.genere }}</td>
        <td>{{ libro.autore.nome }}</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
    background-color: aquamarine;
    border-radius: 8px;
    border-collapse: collapse;
}

th, td {
    padding: 5px;
    border: 1px solid white;
}
</style>