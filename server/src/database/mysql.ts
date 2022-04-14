import mysql from "mysql";

export const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "NLCS",
});

export const connect = () => {
  connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected!!!");
  });
};
