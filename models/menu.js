const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: String,
    imageurl: String,
    price: String
})

const Menu = mongoose.model('Menu', menuSchema)

readMenu = async (options={}) =>
  {
    if (Object.entries(options).length == 0)
       return Menu.find().lean();
   
   else if (options.name)

       return Menu.findOne(options).lean();
   
   else
       return undefined;
   
}

exports.readMenu = readMenu;