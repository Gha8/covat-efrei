<template>
  <div class="container">
    <h1>Liste des trajets</h1>
    <ul v-if="trajets.length">
      <li v-for="trajet in trajets" :key="trajet.id">
        <strong>{{ trajet.depart }} → {{ trajet.destination }}</strong>  
        ({{ trajet.date }} à {{ trajet.heure }})  
        <button @click="reserver(trajet.id)">Réserver</button>
      </li>
    </ul>
    <p v-else>Aucun trajet disponible.</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      trajets: []
    };
  },
  methods: {
    async fetchTrajets() {
      try {
        const response = await axios.get('http://localhost:3000/trajets');
        this.trajets = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des trajets:', error);
      }
    },
    async reserver(trajetId) {
      try {
        const userId = 1; // Remplace par l'ID réel de l'utilisateur connecté
        await axios.post('http://localhost:3000/reserver', { userId, trajetId });
        alert('Réservation effectuée !');
      } catch (error) {
        console.error('Erreur lors de la réservation :', error);
      }
    }
  },
  mounted() {
    this.fetchTrajets();
  }
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
  text-align: center;
}
button {
  margin-left: 10px;
  cursor: pointer;
}
</style>
