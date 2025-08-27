/*
class Restaurant{
    constructor(id_hotel, id_gestionnaire, nom, adresse, type_hotel, description, email, nbre_chambre)
    {
        this.id_hotel = id_hotel;
        this.id_gestionnaire = id_gestionnaire;
        this.nom = nom;
        this.adresse = adresse;
        this.type_hotel = type_hotel;
        this.description = description;
        this.email = email;
        this.nbre_chambre = nbre_chambre;

    }
}*/

class Hotel{
    constructor(id_hotel, id_gestionnaire,name,location,ownerFirstName,ownerLastName,phone,email,description,room,payment,image,rating)
    {
        this.id_hotel = id_hotel;
        this.id_gestionnaire = id_gestionnaire;
        this.name = name;
        this.ownerFirstName = ownerFirstName;
        this.ownerLastName = ownerLastName;
        this.phone = phone;
        this.description = description;
        this.room = room;
        this.payment = payment;
        this.email = email;
        this.image = image;
        this.rating = rating;

    }
}