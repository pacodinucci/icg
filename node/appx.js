	

	var mysql = require('mysql');

	var connection = mysql.createConnection({
		host: 'localhost',
		user: 'root',
		password: '',
		database: 'wordpress'
	});

	connection.connect();

	var params = {

		'ID': '1',
		'user_login': 'rahul'
	};

	var sql = "SELECT * FROM ?? WHERE ?? = ??";

	var inserts = ['wp_users', ['dssda', 'dsads'], params.ID];

	sql = mysql.format(sql, inserts);

	console.dir(sql);

	connection.query(

		'SELECT * from wp_users WHERE ID = ? AND user_login = ?',

		[params.ID, params.user_login],

		function(err, rows, fields) {
			//console.dir('The solution is: ', JSON.stringify(rows[0]));
		}
	);

	connection.end();