module.exports = (sequelize , DataTypes)=>{

    const video = sequelize.define('video',{
        title : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        description : {
            type : DataTypes.TEXT,
            allowNull : false,
        },
        video_url : {
            type : DataTypes.STRING,
            allowNull : false,
            isUrl : true,
        },
        thumbnail_url : {
            type : DataTypes.STRING,
            allowNull : false,
            isUrl : true,
        }
    });

    return video;
}