const { session } = require("electron");

const sqlite3 = require("sqlite3").verbose();


class Session {
    constructor(db) {
        this.#db = db
    }
    execute(sql, param) {
        try {
            var stmt = this.#db.prepare(sql);
            stmt.run(param);
            stmt.finalize();
        } catch (error) {

        }
    }
    select(sql, params, callback) {
        var stmt = this.#db.prepare(sql);
        stmt.each(sql, params, (err, row) => {
            if (err) {
                throw err;
            }

            if (callback) {
                callback(row);
            }
        });
    }
}

class Database {
    constructor(uri = null) {
        this.uri = uri
        this.#db = null
    }
    setup(url) {
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

        session = Session(this.#db);

        this.db.serialize(() => {
            if (transaction) {
                transaction(session);
            }
        });

        this.close();
    }
}

const db = new Database();
module.exports = db;