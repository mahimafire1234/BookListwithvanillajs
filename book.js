//using OOP concept
//making three classes
//Book class
class Book{
    constructor(title,isbn,author){
        this.title=title;
        this.isbn=isbn;
        this.author=author;
    }
}
//Userinterface class
class UI{
    static DisplayBook(){
        // const Storedbooks=[
        //     {
        //         title:"The Kite runner",
        //         isbn:200000,
        //         author:"Khaled Hosselini"
        //     },
        //     {
        //         title:"The Book thief",
        //         isbn:999999,
        //         author:"Markus Zusak"
        //     }
        // ];
        // const books=Storedbooks;
        //displaying books
        const books=Store.getBook();
        //console.log(Object.keys(books));
        //iterating over an object by converting it into an array first
        Object.keys(books).forEach(function(m){
            console.log(m,books[m]);
        })
        //using values
        Object.values(books).forEach(function(m){
            console.log(m);
        })
        books.forEach(book=>UI.addBook(book));
    }
    //addbook function
    static addBook(book){
        const list=document.querySelector("#book-list");
        const row=document.createElement('tr');
        row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.isbn}</td>
        <td>${book.author}</td>
        <td><a href="" class="btn btn-danger delete">X</a></td>
        `;
        list.appendChild(row);
    }
    //clear field function
    static clear(){
        document.querySelector('#title').value='';
        document.querySelector('#isbn').value='';
        document.querySelector('#author').value='';
    }
    //deleting a book
    static delete(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }
    //show message function
    static showMessage(message,className){
        //creating a div 
        const div=document.createElement('div');
        //using bootstrap class alert
        //className is the type of alert like danger, info, success
        div.className=`alert alert-${className}`;
        //inserting the message
        div.appendChild(document.createTextNode(message));
        //positioning a div inside the container but before the form
        const container=document.querySelector('.container');
        const form=document.querySelector("#book-form");
        container.insertBefore(div,form);
        //remove the message in 5 secs
        setTimeout(()=>document.querySelector(".alert").remove(),4000);
    }
}
// UI.DisplayBook();
//displays the books in the table
document.addEventListener("DOMContentLoaded",UI.DisplayBook);

//adding a book 
document.querySelector("#book-form").addEventListener('submit',(e)=>{

    const title1=document.querySelector('#title').value;
    const isbn1=document.querySelector('#isbn').value;
    const author1=document.querySelector('#author').value;
    //prevents actual submit
    e.preventDefault();
    //validation
    if(title1==='' || isbn1==='' || author1===""){
        // alert("Fill in the fields")
        UI.showMessage("Fill all the book details","danger");
    }
    else{
    const arr=new Book(title1,isbn1,author1);
    //add book to ui
    UI.addBook(arr);
    //add book to local storage
    Store.addBook(arr);

    console.log(arr);
    UI.showMessage("Your book has been added","info");
    //clear data from the input field
    UI.clear();
    }
})
//deleting the book
document.querySelector("#book-list").addEventListener('click',(e)=>{
    e.preventDefault();
    //delete function
    UI.delete(e.target);
    //delete from local storage
    Store.removeBook(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
    //consoles
    console.log("here"+e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
    UI.showMessage("Your book has been deleted","info");
    console.log(e.target);
})

//store class(can be done using django or backend framework but trying using js)
class Store{
    //simple crud using js localstorage
    //retreiving books
    static getBook(){
        let books;
        if(localStorage.getItem('books')===null){
            books=[];
        }else{
            books=JSON.parse(localStorage.getItem('books'));
        }
        return books;

    }
    //adding books
    static addBook(book){
        const books=Store.getBook();
        books.push(book);
        localStorage.setItem('books',JSON.stringify(books));
    }
//removing books by books isbn
    static removeBook(isbn){
        const books=Store.getBook();
        books.forEach((book,index)=>{
            if(book.isbn===isbn){
                books.splice(index,1);
            };
        }) 
        localStorage.setItem('books',JSON.stringify(books));

    }

}
