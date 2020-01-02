module.exports = (sequlize , DataTypes) => {

    const brand = sequlize.define('brand',{
        full_name : {
            type : DataTypes.STRING,
            allowNull : false,
            max : 50,
        },
        short_name : {
            type : DataTypes.STRING,
            allowNull : false,
            max : 20,
        },
        logo_url : {
            type : DataTypes.STRING,
            isUrl : true,
            max : 400,
            allowNull : false,
        },
        about : {
            type : DataTypes.TEXT,
            allowNull : false,
        },

        facebook_link : {
            type : DataTypes.STRING,
            isUrl : true,
        },
        twitter_link : {
            type : DataTypes.STRING,
            isUrl : true,
        },
        instagram_link : {
            type : DataTypes.STRING,
            isUrl : true,
        },
    });

    return brand;
}