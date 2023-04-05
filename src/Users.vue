<template>
    <div v-if="showDetails">
        <UserDetail :user="user" :mode="mode" @save="addUser" @cancel="toggleView"/>
    </div>
    <div v-else>
        <h1>User List</h1>
        <button @click="createUser">Create</button>
        <table id="table">
            <thead class="header">
            <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Date</th>
                <th>Edit</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="user in userList" :key="user.id">
                <td>{{ user.name }} {{ user.surname }}</td>
                <td>{{user.email}}</td>
                <td>{{ user.address }}</td>
                <td>{{ formatDate(user.date) }}</td>
                <td><button @click="editUser(user.id)">Edit</button></td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script>

import UserDetail from "@/UserDetail.vue";
import moment from "moment";
import axios from "@/axios";
export default {
    components: {
        UserDetail
    },
    data() {
        return {
            userList: [],
            user: {},
            showDetails: false
        };
    },
    mounted() {
        this.fetchUsers()
    },
    methods: {
        createUser() {
            this.user = {
                id: 0,
                name: "",
                surname: "",
                email:"",
                address: "",
                date: ""
            };
            this.showDetails = true;
            this.mode = "create";
        },
        editUser(id) {
           this.user = this.userList.find(user => user.id === id);
            this.showDetails = true;
            this.mode = "edit";
        },
        fetchUsers() {
            // Fetch the list of users from the API using an HTTP library such as Axios
            axios.get('/users')
                .then(response => {
                    this.userList = response.data;
                })
                .catch(error => {
                    console.log(error);
                });
        },
        formatDate(date) {
            // Format the date using a library such as Moment.js
            return moment(date).format('dddd Do [of] MMMM YYYY h:mm:ss A');
        },
        toggleView() {
            this.showDetails = !this.showDetails;
        },
        addUser(user) {
            if(this.mode === 'create')
                this.userList.unshift(user);
            else
                this.userList = this.userList.map(u => u.id === user.id ? user : u);
            this.toggleView();
        },
    }
};
</script>

<style>
#table {
    padding-top: 20px;
   margin: auto;
    width: 100%;
    border: 1px solid black;
    border-collapse: collapse;
    .header {
        background-color: #4CAF50;
        color: white;
    }
}
</style>
