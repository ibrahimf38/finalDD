class Hotel {
    constructor(
        id_hotel,
        id_gestionnaire,
        nom,
        adresse,
        type_hotel,
        description,
        email,
        nbre_chambre,
        localisation,
        ownerFirstName,
        ownerLastName,
        phone,
        price,
        payment,
        image,
        facilities,
        rating
    ) {
        this.id_hotel = id_hotel;
        this.id_gestionnaire = id_gestionnaire;
        this.nom = nom;
        this.adresse = adresse;
        this.type_hotel = type_hotel;
        this.description = description;
        this.email = email;
        this.nbre_chambre = nbre_chambre;
        this.localisation = localisation;
        this.ownerFirstName = ownerFirstName;
        this.ownerLastName = ownerLastName;
        this.phone = phone;
        this.price = price;
        this.payment = payment;
        this.image = image;
        this.facilities = facilities;
        this.rating = rating;
    }
}
