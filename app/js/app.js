var app = new Vue({
    el: '#app',
    data: {
        message: "hello",
        customers: [],
        menu: [
            {
                id: 'customer',
                name: 'Customers'
            }, {
                id: 'transaction',
                name: 'Transaction'
            }
        ],
        searchText: ""
    },
    created() {
        console.log("hello")
        this.fetchData()
    },
    methods: {
        async fetchData() {
            this.customers = await window.api.fetchallCustomers({});
            console.log(this.customers)
        },
        async searchCustomer() {
            console.log(this.searchText)
            this.customers = await window.api.searchCustomers({ searchText: this.searchText })
            console.log(this.customers)
        }
    }
})