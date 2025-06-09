module.exports = (sequelize, DataTypes) => {
    return sequelize.define('debit_card', {
        card_no: { type: DataTypes.STRING },
        cvv: { type: DataTypes.STRING },
        type: { type: DataTypes.STRING },
        holder: { type: DataTypes.STRING },
        exp: { type: DataTypes.STRING },
        activated: { type: DataTypes.STRING, allowNull: false, defaultValue: 'false' },
        userid: { type: DataTypes.INTEGER },
        pin: { type: DataTypes.INTEGER,allowNull:true }
    })
}