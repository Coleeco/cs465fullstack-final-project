// queryDB
// Provides necessary queries to Postgres server for Cocktail App

const Pool = require("pg").Pool;

let connectionString;

// If not in production use local postgres server, else use Heroku provided DB
if (process.env.NODE_ENV !== "production") {
  connectionString = "postgresql://cocktail:password@localhost:5432/localdb";
} else {
  connectionString = process.env.DATABASE_URL;
  console.log(process.env.DATABASE_URL);
}
const pool = new Pool({
  connectionString: connectionString,
});

const createUser = (request, response) => {
  const { loginname, password } = request.body;

  pool.query(
    "INSERT INTO userdata (loginname, password) VALUES ($1, $2)",
    [loginname, password],
    (error, results) => {
      if (error) {
        throw error;
      }
      request.session.user = loginname;
      response.status(201).send(`User added`);
    }
  );
};

const logUserIn = (request, response) => {
  const { loginname, password } = request.body;
  let session = request.session;
  pool.query(
    "SELECT loginname, score FROM userdata WHERE loginname = $1 AND password = $2",
    [loginname, password],
    (error, results) => {
      if (error) {
        throw error;
      }
      let result = results.rows;
      if (result.length) {
        session.user = loginname;
        response.status(200).json(result);
      } else response.status(401).send("No user found");
    }
  );
};

const getUsers = (request, response) => {
  pool.query(
    "SELECT loginname FROM userdata ORDER BY loginname ASC",
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getCurrentUser = (request, response) => {
  let user = request.session.user;
  console.log(request.session.user);
  if (request.session.user !== undefined) {
    pool.query(
      "SELECT loginname, score FROM userdata WHERE loginname = $1",
      [user],
      (error, results) => {
        if (error) {
          throw error;
        }
        response.status(200).json(results.rows);
      }
    );
  } else response.status(400).send("No logged on user");
};

const addFavorite = (request, response) => {
  const { loginname, drinkID } = request.body;

  pool.query(
    "INSERT INTO favorites (username, drinkid) VALUES ($1, $2)",
    [loginname, drinkID],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`drink added`);
    }
  );
};

const getUserFavorites = (request, response) => {
  const user = request.params.user;
  pool.query(
    "SELECT drinkid FROM favorites WHERE username = $1 ORDER BY drinkid",
    [user],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).json(results.rows);
    }
  );
};

const getTitles = (request, response) => {
  pool.query("SELECT * FROM titles ORDER BY minscore ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const setScore = (request, response) => {
  const { loginname, score } = request.body;

  pool.query(
    "UPDATE userdata SET score = $2 WHERE loginname = $1",
    [loginname, score],
    (error, results) => {
      if (error) {
        throw error;
      } else {
        let user = { loginname: loginname, score: score };
        response.status(200).send(user);
      }
    }
  );
};

// QUERY TEST BED
function queryDB() {
  // let loginname = "testuser";
  // let password = 'password';
  // let drinkID = 99999;
  // *** BASIC QUERY TEST
  // pool.query('SELECT * FROM titles ORDER BY minscore ASC', (err, res) => {
  //   if(err){
  //     throw err;
  //   }
  //   console.log(res.rows);
  //   pool.end();
  // });
  // ** TEST INSERT QUERY
  // pool.query('INSERT INTO userdata (loginname, password) VALUES ($1, $2)', [loginname, password], (error, results) => {
  //   if (error) {
  //     throw error
  //   }
  //   console.log(results);
  //   pool.end();
  // })
  // ** TEST LOGIN CREDENTIAL RETRIEVAL
  //  pool.query('SELECT loginname FROM userdata WHERE loginname = $1 AND password = $2', [loginname, password], (error, results) => {
  //   if (error) {
  //     throw error
  //   }
  //   let result = results.rows;
  //   if (result.length){
  //     console.log(result[0].loginname);
  //   }
  //   pool.end();
  // })
  // ** TEST ADDING FAVORITE
  // pool.query(
  //   "INSERT INTO favorites (username, drinkid) VALUES ($1, $2)",
  //   [loginname, drinkID],
  //   (error, results) => {
  //     if (error) {
  //       throw error;
  //     }
  //     console.log(results);
  //     pool.end();
  //   }
  // );
}

// queryDB();
module.exports = {
  logUserIn,
  getUsers,
  createUser,
  getCurrentUser,
  getUserFavorites,
  addFavorite,
  getTitles,
  setScore
};
