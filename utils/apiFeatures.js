class APIFeatures {
    constructor(query, queryString) {
      this.query = query;
      this.queryString = queryString;
    }

    filter() {
      const queryObj = { ...this.queryString };
      const excludeQueries = ["page", "limit", "sort", "fields"];
      excludeQueries.forEach((el) => {
        delete queryObj[el];
      });

      if(queryObj.recipe){
        queryObj.title = { $regex: queryObj.recipe, $options: "i" }
        delete queryObj.recipe;
      }

      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(
        /\b(gte|gt|lte|lt)\b/g,
        (match) => `$${match}`
      );

      this.query.find(JSON.parse(queryStr));

      return this;
    }

    sort() {
      if (this.queryString.sort) {
        const sortName = this.queryString.sort.split(",").join(" ");

        this.query = this.query.sort(sortName);
      } else {
        this.query = this.query.sort("social_rank");
      }

      return this;
    }

    fieldLimit() {
      if (this.queryString.fields) {
        const fieldName = this.queryString.fields.split(",").join(" ");

        this.query = this.query.select(fieldName);
      } else {
        this.query = this.query.select("-__v");
      }

      return this;
    }

    paginate() {
      const limit = this.queryString.limit || 100;
      const page = this.queryString.page || 1;
      const skip = (page - 1) * limit;

      this.query = this.query.limit(limit).skip(skip);

      return this;
    }
  }

  module.exports = APIFeatures;