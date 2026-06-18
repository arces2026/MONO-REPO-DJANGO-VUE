<script setup>
import Grid from '@/components/Grid.vue';
import ProductList from '@/components/ProductList.vue';
import { ref } from 'vue';

const products = ref([
    { id: 1, nome: "Scarpe Nike Air", prezzo: 150, inStock: true },
    { id: 2, nome: "Maglietta Adidas", prezzo: 45, inStock: true },
    { id: 3, nome: "Jeans Levi's", prezzo: 85, inStock: false },
    { id: 4, nome: "Orologio Casio", prezzo: 60, inStock: true },
    { id: 5, nome: "Zaino Eastpak", prezzo: 70, inStock: true },
    { id: 6, nome: "Cuffie Sony", prezzo: 120, inStock: false },
    { id: 7, nome: "Occhiali Ray-Ban", prezzo: 130, inStock: true },
    { id: 8, nome: "Portafoglio Pelle", prezzo: 40, inStock: true },
    { id: 9, nome: "Giacca Invernale", prezzo: 180, inStock: false },
    { id: 10, nome: "Smartphone Xiaomi", prezzo: 299, inStock: true }
]);

const gridColumns = ['nome', 'prezzo']

const searchQuery = ref('')

</script>

<template>
  <main class="main" >
    <ProductList style="width: 45%;">
    </ProductList>
    <Grid
      style="width: 45%;"
      :data="products"
      :columns="gridColumns"
      :filter-key="searchQuery">
    </Grid>
  </main>

</template>

<style>
  .main{
    display: flex;
    justify-content:space-between;
  }

</style>
