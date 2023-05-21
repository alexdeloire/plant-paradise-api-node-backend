module.exports = (mongoose, mongoosePaginate) => {
  const schema = mongoose.Schema(
    {
      title: String,
      description: String,
      published: Boolean,
      family: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Family"
      },
      biotope: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Biotope"
      }
    },
    { timestamps: true }
  );

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  schema.plugin(mongoosePaginate);

  const Item = mongoose.model("item", schema);
  return Item;
};
