const mongoose = require('mongoose');
const structure = mongoose.Schema;

const newStructure = new structure({
  Name: {
    type: String,
    required: true
  },
  MoneyPerHour: {
    type: Number,
    required: true
  },

  HoursPerWeek: {
    type: Number,
    required: true
  },
  Single: {
    type: String,
    required: true
  },
  //Dependent: {
  //  type: String,
  //  required: true
// }
});

const ogModel = mongoose.model('taxcollection', newStructure);
module.exports = ogModel;
