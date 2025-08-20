class Administrateur extends Personne {
  constructor(
    id,
    nom,
    email,
    telephone,
    adresse,
    mot_de_passe,
    id_Administrateur,
    role
  ) {
    super(id, nom, email, telephone, adresse, mot_de_passe, role);

    this.id_Administrateur = id_Administrateur;
  }

  afficherInfosAdmin() {
    console.log(
      `Administrateur: ${this.nom} (ID Admin: ${this.id_Administrateur})`
    );
  }
}
