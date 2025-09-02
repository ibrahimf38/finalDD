class Utilisateur extends Personne {
    constructor(
        id,
        nom,
        email,
        telephone,
        adresse,
        mot_de_passe,
        id_utilisateur,
        localisation,
        role
    ) {
        super(id, nom, email, telephone, adresse, mot_de_passe, role);

        this.id_utilisateur = id_utilisateur;
        this.localisation = localisation;
    }
}
