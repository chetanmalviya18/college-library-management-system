class BookApiTransform {
  static transform(book) {
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      publisher: book.publisher,
      yearOfPublication: book.yearOfPublication,
      ISBN: book.ISBN,
      courseType: book.courseType,
      quantity: book.quantity,
    };
  }
}

export default BookApiTransform;
