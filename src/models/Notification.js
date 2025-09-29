class Notification {
    constructor(
        id_notification,
       userId,
        titre,
        message,
        type,
        createdAt,
        updatedAt
    ) {
        this.id_notification = id_notification;
        this.userId = userId;
        this.titre = titre;
        this.message = message;
        this.type = type;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}

module.exports = Notification;
