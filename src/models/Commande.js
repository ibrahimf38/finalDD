class Commande {
  constructor(
    id_commande,
    id_utilisateur,
    id_restaurant,
    id_gestionnaire,
    qte_commande,
    date_commande
  ) {
    this.id_commande = id_commande;
    this.id_utilisateur = id_utilisateur;
    this.id_restaurant = id_restaurant;
    this.id_Gestionnaire = id_gestionnaire;
    this.date_commande = date_commande;
    this.qte_commande = qte_commande;
  }
}
