<script setup>
// import UserForm from '@/components/UserForm.vue';
import UsersList from '@/components/UsersList.vue';
import { onMounted, ref } from 'vue';


const users = ref([]);

onMounted(() => {
  fetch('http://localhost:3000/api/users')
    .then((response) => {
      // Controllo manuale dello stato HTTP
      if (!response.ok) {
        throw new Error(`Errore HTTP: ${response.status}`)
      }
      // Converte la risposta in JSON (ritorna una nuova Promise)
      return response.json()
    })
    .then((data) => {
      // Aggiorna lo stato reattivo con i dati ricevuti
      users.value = data
    })
    
    console.log(users.value);

})

</script>

<template>
    <!-- CORREZIONE: L'evento viene ascoltato qui, dove viene effettivamente emesso -->
    <!-- <UserForm @add-user="addUser"></UserForm> -->
    <!-- La lista deve solo ricevere i dati aggiornati -->
    <UsersList :users="users"></UsersList>
</template>
