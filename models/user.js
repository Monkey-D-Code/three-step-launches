module.exports = (sequelize , DataTypes ) => {
    const user = sequelize.define('user' , {
        id : {
            type : DataTypes.INTEGER,
            unique : true,
            autoIncrement : true,
            primaryKey : true,
        },
        first_name : {
            type : DataTypes.STRING,
            allowNull : false,
            max : 50,
        },
        last_name : {
            type : DataTypes.STRING,
            allowNull : false,
            max : 50,
        },
        email : {
            type : DataTypes.STRING,
            isEmail : true,
            allowNull : false,
            max : 200,
            unique : true,
        },
        phone : {
            type : DataTypes.BIGINT,
            max : 20,
            min : 10,
            unique : true,
        },
        displayImageUrl : {
            type : DataTypes.STRING,
            max : 400,
            allowNull : true,
        },
        password :{
            type : DataTypes.STRING,
            min : 8,
            max : 30,
            allowNull : false,
        },

        isActive : {
            type : DataTypes.BOOLEAN,
            defaultValue : true,
        },

        isStaff : {
            type : DataTypes.BOOLEAN,
            defaultValue : false,
        },
        isSuperUser : {
            type : DataTypes.BOOLEAN,
            defaultValue : false,
        },


    },{timestamps:true})

    return user;
}