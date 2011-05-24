Database
========
##Introduction

There are two ways to use databases in Titanium: HTML 5 databases
and the database API. In some cases you access the same database
file with both APIs as well. Currently both APIs use SQLite backends.

##Opening a Database

There are two ways to open Titanim databases, <tt>Titanium.Database.open</tt>
and <tt>Titanium.Database.openFile</tt>. <tt>open</tt> will create (if necessary)
and open a database in the same directory and schema as WebKit HTML 5 databases.
Use this method if you'd like to use a single database with both APIs.

	:::javascript
	// Create a WebKit-compatible database given, the database name.
	var db = Titanium.Database.open('mydatabase');

You may also create a database using <tt>Titanium.Database.openFile</tt>
which can be given a file path or <tt>Titanium.Filesystem.File</tt> object.
If the database file does not exist, the method will create it and open it.

	:::javascript
	var db = Titanium.Database.openFile(Titanium.Filesystem.getFile(
		Titanium.Filesystem.getApplicationDataDirectory(), 'mydatabase.db'));

Note: It's recommended that you store all data in the application data
directory and not the application Resources or contents directory, as those
may not be writeable.

##Simple Queries

Once a database is open you may execute simple queries on it. For instance,
to create a table:

	:::javascript
	var db = Titanium.Database.openFile(Titanium.Filesystem.getFile(
		Titanium.Filesystem.getApplicationDataDirectory(), 'mydatabase.db'));
	db.execute("CREATE TABLE IF NOT EXISTS test(id INTEGER, name TEXT)");

Note: Be sure your query is SQLite-compatible! SQLite has different data
types than MySQL, check them out [here](http://www.sqlite.org/datatype3.html).

Find a way to detect databases that already exist.

Inserting and retrieving data works in a very similar way:

	:::javascript
	var db = Titanium.Database.openFile(Titanium.Filesystem.getFile(
		Titanium.Filesystem.getApplicationDataDirectory(), 'mydatabase.db'));

	db.execute("CREATE TABLE IF NOT EXISTS test(id INTEGER, name TEXT)");
	db.execute("INSERT INTO test VALUES(123, 'a')");

	var resultSet = db.execute("SELECT * FROM test");
	alert("Found " + resultSet.rowCount() + " rows");
	while (resultSet.isValidRow())
	{
		var text = "";
		for (var i = 0; i &lt; resultSet.fieldCount(); i++)
			text += resultSet.fieldName(i) + ":"
				 + resultSet.field(i) + " ";
		alert(text);
		resultSet.next();
	}

##Advanced Queries

You should never used unescaped input in SQL queries. In these situations
Titanium provides a query template mechanism:

	:::javascript
	var db = Titanium.Database.openFile(Titanium.Filesystem.getFile(
		Titanium.Filesystem.getApplicationDataDirectory(), 'mydatabase.db'));

	var id = prompt("Enter entry id");
	if (!id)
		return;
	var value = prompt("Enter entry value");
	if (!value)
		return;

	db.execute("CREATE TABLE IF NOT EXISTS test(id INTEGER, name TEXT)");
	db.execute("INSERT INTO test VALUES(?, ?)", id, value);

	var resultSet = db.execute("SELECT * FROM test");
	alert("Found " + resultSet.rowCount() + " rows");
	while (resultSet.isValidRow())
	{
		var text = "";
		for (var i = 0; i &lt; resultSet.fieldCount(); i++)
			text += resultSet.fieldName(i) + ":"
				 + resultSet.field(i) + " ";
		alert(text);
		resultSet.next();
	}
