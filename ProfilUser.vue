<template>
  <div class="profile-container">
    <h2>Profil Utilisateur</h2>
    <button class="logout-btn" @click="logout">Déconnexion</button>

    <!-- 🔹 Liste des trajets publiés -->
    <h3>Mes trajets</h3>
    <ul v-if="trajets.length">
      <li v-for="trajet in trajets" :key="trajet.id">
        <strong>{{ trajet.depart }} → {{ trajet.destination }}</strong> ({{ trajet.date }}) 
        <button class="edit-btn" @click="editTrajet(trajet)">Modifier</button>
        <button class="delete-btn" @click="supprimerTrajet(trajet.id)">Supprimer</button>
      </li>
    </ul>
    <p v-else>Aucun trajet trouvé.</p>

    <!-- 🔹 Formulaire pour ajouter/modifier un trajet -->
    <h3>{{ isEditing ? "Modifier" : "Ajouter" }} un trajet</h3>
    <form @submit.prevent="isEditing ? updateTrajet() : ajouterTrajet()">
      <input v-model="nouveauTrajet.depart" placeholder="Départ" required />
      <input v-model="nouveauTrajet.destination" placeholder="Destination" required />
      <input v-model="nouveauTrajet.date" type="date" required />
      <button type="submit">{{ isEditing ? "Modifier" : "Ajouter" }}</button>
      <button v-if="isEditing" class="cancel-btn" @click="cancelEdit">Annuler</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      trajets: [],
      nouveauTrajet: { depart: "", destination: "", date: "", id: null },
      isEditing: false,
      userId: localStorage.getItem("userId") || null,
    };
  },
  methods: {
    // 🔹 Charger les trajets de l'utilisateur connecté
    async fetchTrajets() {
      try {
        const response = await axios.get(`http://localhost:3000/trajets?userId=${this.userId}`);
        this.trajets = response.data;
      } catch (error) {
        console.error("Erreur lors du chargement des trajets", error);
      }
    },
    
    // 🔹 Ajouter un trajet
    async ajouterTrajet() {
      try {
        await axios.post("http://localhost:3000/trajets", { ...this.nouveauTrajet, userId: this.userId });
        this.fetchTrajets();
        this.resetForm();
      } catch (error) {
        console.error("Erreur lors de l'ajout du trajet", error);
      }
    },

    // 🔹 Modifier un trajet (pré-remplir le formulaire)
    editTrajet(trajet) {
      this.nouveauTrajet = { ...trajet };
      this.isEditing = true;
    },

    // 🔹 Mettre à jour un trajet
    async updateTrajet() {
      try {
        await axios.put(`http://localhost:3000/trajets/${this.nouveauTrajet.id}`, this.nouveauTrajet);
        this.fetchTrajets();
        this.resetForm();
      } catch (error) {
        console.error("Erreur lors de la modification du trajet", error);
      }
    },

    // 🔹 Supprimer un trajet
    async supprimerTrajet(trajetId) {
      try {
        await axios.delete(`http://localhost:3000/trajets/${trajetId}`);
        this.fetchTrajets();
      } catch (error) {
        console.error("Erreur lors de la suppression du trajet", error);
      }
    },

    // 🔹 Annuler l'édition
    cancelEdit() {
      this.resetForm();
    },

    // 🔹 Réinitialiser le formulaire
    resetForm() {
      this.nouveauTrajet = { depart: "", destination: "", date: "", id: null };
      this.isEditing = false;
    },

    // 🔹 Déconnexion
    logout() {
      localStorage.removeItem("userId");
      this.$router.push("/login");
    }
  },
  mounted() {
    this.fetchTrajets();
  }
};
</script>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}
button {
  margin-left: 10px;
  padding: 5px 10px;
  border: none;
  cursor: pointer;
}
.logout-btn { background: red; color: white; }
.edit-btn { background: orange; }
.delete-btn { background: crimson; color: white; }
.cancel-btn { background: gray; color: white; }
</style>
