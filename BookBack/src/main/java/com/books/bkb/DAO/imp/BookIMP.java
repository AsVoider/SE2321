package com.books.bkb.DAO.imp;

import com.books.bkb.DAO.inter.BookDAO;
import com.books.bkb.Entity.Book;
import com.books.bkb.Repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class BookIMP implements BookDAO {
    @Autowired
    BookRepository bookRepository;
    @Override
    public Book findOneBook(Integer id)
    {
        return bookRepository.findById(id).orElse(null);
    }
    @Override
    public List<Book> findAll()
    {
        return bookRepository.findAll();
    }
    @Override
    public Book saveBook(Book book) {
        return bookRepository.save(book);
    }
    @Override
    public void deleteBook(Integer id) {
        var book = findOneBook(id);
        if(book != null)
        {
            book.setIsExist(-1);
            bookRepository.save(book);
        }
    }
    @Override
    public List<Book> findBooksContains(String string)
    {
        return bookRepository.findByTitleContainingIgnoreCase(string);
    }
}
