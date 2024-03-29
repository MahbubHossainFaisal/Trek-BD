class APIFeatures{
  constructor(query,queryString){
    this.query = query
    this.queryString = queryString
  }

  filter(){
     const queryObj = {...this.queryString}
  //fields to exclude before query
  const excluededFields = ['page','limit','sort','fields']

  excluededFields.forEach(el => delete queryObj[el])

  //advance filtering
  let queryStr = JSON.stringify(queryObj)
  //regular expression to match exact word like gt,gte,lt,lte
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)


   this.query = this.query.find(JSON.parse(queryStr))
   return this
  }

  sort(){
    if(this.queryString.sort){
     const sortBy = this.queryString.sort.split(',').join(' ');

    this.query = this.query.sort(sortBy);
   }else{
     //by default sorting will be held using createdAt property
     this.query = this.query.sort('-createdAt');
     
   }
   return this
  }

  limitFields(){
    if(this.queryString.fields){
     const fields = this.queryString.fields.split(',').join(' ')
     this.query = this.query.select(fields)
   }else{
     //just removing the __v property that mongoose uses.Because we have no use of it.
     this.query = this.query.select('-__v')
   }
   return this
  }

  paginate(){
    const page = this.queryString.page * 1 || 1
   const limitValue = this.queryString.limit * 1 || 100
   const skipValue = (page-1) * limitValue

   this.query = this.query.skip(skipValue).limit(limitValue)

    return this
  }
}

module.exports = APIFeatures;