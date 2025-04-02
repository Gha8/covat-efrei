<template>
     <div>
     <h2>Liste des articles</h2>
 <ul>
     <li v-for="article in articles" :key="article.id">
     <h3>{{ article.name }}</h3>
     <p>{{ article.description }}</p>
     <p>{{ article.price }}</p>
     </li>
     </ul>
     </div>
    </template>
    <script>
 import axios from 'axios';
    
     export default {
     data() {
     return {
 articles: []
     };
     },
     created() {
     axios.get('http://localhost:3000/articles')
     .then(response => {
     this.articles = response.data;
     })
     .catch(error => {
     console.error('Erreur lors de la récupération des articles:', error);
     });
     }
     };
     </script>
    
    