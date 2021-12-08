const Service = require('./base')
const { session } = require('electron')
const db = require('../engine/database')

class CustomerService {
    async fetchAllCustomers() {
        console.log("in service")
        return new Promise(resolve => {
            db.begin(async (session) => {
                const rows = await session.select("select name from customers", [])
                console.log(rows)
                resolve(rows)
            })
        })

    }
    async searchCustomers(searchText) {
        return new Promise(resolve => {
            db.begin(async (session) => {
                const rows = await session.select("select name from customers where name like ?", ['%' + searchText + '%'])
                console.log(rows)
                resolve(rows)
            })
        })
    }
    fetchCustomer() {

    }
    createCustomer(name) {
        db.begin((session) => {
            session.execute(`
                insert into customers (name)
                values (?)
            `, [name])
        })
    }
}

const service = new CustomerService()

module.exports = service
