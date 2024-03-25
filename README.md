# Scripts

Development of an assistant for analyzing legal cases, using scripts executed by shortcuts (any browser extension that allows the execution of JavaScript code).

Here we will learn how to interact with tables, using scripts coded in JavaScript. But first, let's understand each HTML tag that makes up the structure of a table.

## HTML - Tables

There are several HTML tags related to tables. Here we have the fundamentals, found in all tables.

- `<table>`- defines the limits of the table. Inside it we will find cells, distributed in rows and columns;
- `<tr></tr>` - stands for Table Row;
- `<td></td>` - stands for Table Data. It represents the cells, and each row (`<tr>`) must have the same number of cells, because from this intersaction (rows and cells) we will have the table columns. Inside a cell we can code all sorts of HTML elements, like lists, images, texts and even other tables.

Other elements are:

- `<th>` Defines a header cell in a table;
- `<caption>` - defines a table caption;
- `<colgroup>` - specifies a group of one or more columns in a table for formatting;
- `<col>` - specifies column properties for each column within a `<colgroup>` element;
- `<thead>` - groups the header content in a table;
- `<tbody>` - is used in conjunction with the `<thead>` and `<tfoot>` elements to specify each part of a table (body, header, footer). Browsers can use these elements to enable scrolling of the table body independently of the header and footer. Also, when printing a large table that spans multiple pages, these elements can enable the table header and footer to be printed at the top and bottom of each page;  
- `<tfoot>` - groups the footer content in a table.  
[font](https://www.w3schools.com/html/html_tables.asp)

## JavaScript - Scripts
