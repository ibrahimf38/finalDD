class Restaurant {
    constructor(
        id_restaurant,
        id_gestionnaire,
        nom,
        adresse,
        description,
        email,
        localisation,
        ownerFirstName,
        ownerLastName,
        phone,
        plat,
        price,
        quantity,
        payment,
        image
    ) {
        this.id_restaurant = id_restaurant;
        this.id_gestionnaire = id_gestionnaire;
        this.nom = nom;
        this.description = description;
        this.email = email;
        this.localisation = localisation;
        this.ownerFirstName = ownerFirstName;
        this.ownerLastName = ownerLastName;
        this.phone = phone;
        this.plat = plat;
        this.price = price;
        this.quantity = quantity;
        this.payment = payment;
        this.image = image;
    }
}
