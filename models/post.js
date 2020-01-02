module.exports = (sequelize , DataTypes ) => {

    const post = sequelize.define('post',{
        title : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        cover_image_url : {
            type : DataTypes.STRING(500),
            allowNull : false,
            isUrl : true,
        },
        body : {
            type : DataTypes.TEXT,
            allowNull : false,
        }
    });

    return post;
}