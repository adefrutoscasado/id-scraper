const mongoose = require('mongoose')
const {Schema, Model} = mongoose

const ItemSchema = new Schema(
  {
    productId: { type: String, required: true },
    image: { type: Buffer }
  },
  { timestamps: true }
)

class ItemModel extends Model {
  static getAll() {
    return this.find({})
  }
  static upsert(productId, imageBase64String) {
    let item = {} // item to update should be a plain object: https://stackoverflow.com/questions/48484798/mongoose-findoneandupdate-issue?noredirect=1&lq=1
    item.productId = productId
    item.image = Buffer.from(imageBase64String, 'base64')
    return this.findOneAndUpdate({productId}, item, {upsert: true})
  }
}

ItemSchema.loadClass(ItemModel)
let Item = mongoose.model('items', ItemSchema)

module.exports = Item
