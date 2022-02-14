var express = require('express');
var router = express.Router();


// error object send incase of error
const errBookObj = {
  id: "NA",
  name: "NA",
  author: "NA",
  year_pub: "NA",
  ISBN: "NA",
  msg: ""
}

// database for application
var booksDB = [{
  "id": 1,
  "name": "The ABC",
  "author": "Tom Hanks",
  "year_pub": "2000",
  "ISBN": 1234567890
},
{
  "id": 2,
  "name": "The XYZ",
  "author": "Tom Baker",
  "year_pub": "2010",
  "ISBN": 9834567890
},
{
  "id": 3,
  "name": "The PQR",
  "author": "Billy Jole",
  "year_pub": "2003",
  "ISBN": 8034567890
}
]

const validateBookObj = (book) => {
  // check if all the values are present in the object
  if (!book || !book.name || !book.author || !book.year_pub || !book.ISBN || !book.id) {
    return false;
  }
  // validate name
  if (!isNaN(book.name) || book.name.length === 0) {
    return false
  }
  // validate author
  if (!isNaN(book.author) || book.author.length === 0) {
    return false
  }
  // validate ISBN
  if (isNaN(book.ISBN) || book.ISBN.toString().length !== 10) {
    return false
  }
  // validate year
  if (isNaN(book.year_pub) || book.year_pub.toString().length !== 4 || book.year_pub >= 2022) {
    return false
  }
  return true;
}

/* GET books listings. */
router.get('/', (req, res, next) => {
  var allBooks = booksDB // get all books
  res.send(allBooks);
});

/* GET book listing. */
router.get('/:id', (req, res, next) => {
  // find the book id
  const book = booksDB.find(book => book.id === parseInt(req.params.id));
  // check if the book data is valid
  if (validateBookObj(book)) {
    res.send(book); // send the book data
  }
  else {
    // data is invalid send error msg
    errBookObj.msg = "Invalid ID"
    res.status(404).send(errBookObj)
  }
});

/* Add(POST) book listing. */
router.post('/', (req, res, next) => {
  //get data from body of the request 
  const book = {
    "id": booksDB.length === 0 ? 1 : booksDB[booksDB.length - 1].id + 1,
    "name": req.body.data.name,
    "author": req.body.data.author,
    "year_pub": req.body.data.year_pub,
    "ISBN": req.body.data.ISBN,
  }

  // validate data
  if (validateBookObj(book)) {
    res.send(book);  // send response msg 
    booksDB.push(book); // update db
  }
  else {
    // data is invalid send error msg
    errBookObj.msg = "Invalid data"
    res.status(404).send(errBookObj)
  }
});

/* Update(PUT) book listing. */
router.put('/:id', (req, res, next) => {
  //get update data from body of the request 
  const new_book = {
    "id": parseInt(req.params.id),
    "name": req.body.data.name,
    "author": req.body.data.author,
    "year_pub": req.body.data.year_pub,
    "ISBN": req.body.data.ISBN,
  }

  // find the book id
  const old_book = booksDB.find(book => book.id === parseInt(new_book.id));

  // check if the book id exist
  if (validateBookObj(old_book)) {
    // check if the new data is valid
    if (validateBookObj(new_book)) {
      res.send(new_book); // send the book data

      // update
      book_id = booksDB.map(function (book) {
        return book.id;
      }).indexOf(parseInt(new_book.id));
      booksDB[book_id] = new_book
    }
    else {
      // data is invalid send error msg
      errBookObj.msg = "Update data invalid"
      res.status(500).send(errBookObj)
    }
  }
  else {
    // data is invalid send error msg
    errBookObj.msg = "Cannot locate book id"
    res.status(404).send(errBookObj)
  }
});

/* Delete book listing. */
router.delete('/:id', (req, res, next) => {
  // find the book id
  const book = booksDB.find(book => book.id === parseInt(req.params.id));
  // check if the book data is valid
  if (validateBookObj(book)) {
    responseObj = errBookObj
    responseObj.msg = "book deleted"
    res.send(responseObj); // send the book data

    booksDB = booksDB.filter((book) => {return book.id !== parseInt(req.params.id)}) // del data
  }
  else {
    // data is invalid send error msg
    errBookObj.msg = "Cannot locate book id"
    res.status(404).send(errBookObj)
  }
});


module.exports = router;
