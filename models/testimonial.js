module.exports = (sequelize , DataTypes)=> {
    const testimonial = sequelize.define('testimonial' , {
        full_name : {
            type : DataTypes.STRING,
            allowNull : false,
        },
        display_image_url : {
            type : DataTypes.STRING,
            isUrl : true,
            allowNull : false,
            
        },
        text : {
            type : DataTypes.TEXT,
            allowNull : false,
        },
        published : {
            type : DataTypes.BOOLEAN,
            defaultValue : true,
        }

    });

    return testimonial;
}