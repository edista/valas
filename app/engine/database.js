const { session } = require("electron");

const sqlite3 = require("sqlite3").verbose();


class Session {
    #db;
    constructor(db) {
        this.#db = db
    }
    execute(sql, param) {
        try {
            var stmt = this.#db.prepare(sql);
            stmt.run(param);
            stmt.finalize();
        } catch (error) {
            console.log(error.message);
        }
    }
    async select(sql, params) {
        return new Promise(resolve => {
            try {
                var stmt = this.#db.prepare(sql);
                stmt.all(params, (err, rows) => {
                    if (err) {
                        throw err;
                    }
                    resolve(rows);
                });
                stmt.finalize();
            } catch (error) {
                console.log("error here");

                console.log(error.message);
            }
        })
    }
}

class Database {
    #db;
    constructor(uri = null) {
        this.uri = uri
        this.#db = null
    }
    setup(uri) {
        this.uri = uri
    }
    open() {
        // "./app/valas.db"
        if (this.uri == null) {
            throw Error("Database Uri not set.")
        }
        this.#db = new sqlite3.Database(this.uri, sqlite3.OPEN_READWRITE, (err) => {
            if (err) {
                console.log(err.message);
            }
        });
    }
    close() {
        this.#db.close((err) => {
            if (err) {
                console.log(err.message);
            }
        });
    }

    begin(transaction) {
        if (!(this.db && this.db.isOpen())) {
            this.open()
        }

        const session = new Session(this.#db);

        this.#db.serialize(() => {
            if (transaction) {
                return transaction(session);
            }
        });

        this.close();
    }
}

const db = new Database();
module.exports = db;