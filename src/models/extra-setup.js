exports.applyExtraSetup = (sequelize) => {
    const {
        User,
        Checklist,
        Listitem
    } = sequelize.models;

    User.hasMany(Checklist);
    Checklist.belongsTo(User, { as: 'user' });

    Checklist.hasMany(Listitem);
    Listitem.belongsTo(Checklist, { as: 'checklist' });
};