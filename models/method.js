module.exports = (sequelize , DataTypes) => {

    const method = sequelize.define('method',{
        title : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        image_url : {
            type : DataTypes.STRING,
            allowNull : false,
            max : 500,
        },
        description : {
            type : DataTypes.TEXT,
            allowNull : false,
        }
    });

    return method;
}