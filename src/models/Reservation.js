class Reservation{
    constructor(id_reservation, id_utilisateur, id_restaurant, id_hotel, id_evenement, id_activite, date_reservation, nbre_personne)
    {
        this.id_reservation = id_reservation;
        this.id_personne = id_utilisateur;
        this.id_restaurant = id_restaurant;
        this.id_hotel = id_hotel;
        this.id_evenement = id_evenement;
        this.id_activite = id_activite;
        this.date_reservation = date_reservation;
        this.nbre_personne = nbre_personne;
    }
}