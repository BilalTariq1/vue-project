<template>
    <div>
        <h1>User Detail</h1>
        <form id="form" @submit.prevent="saveUser">
            <label>
                Name:
                <input type="text" v-model="user.name" required>
            </label>
            <label>
                Surname:
                <input type="text" v-model="user.surname" required>
            </label>
            <label>
                Email:
                <input type="email" v-model="user.email" required>
            </label>
            <label>
                Address:
                <input type="text" v-model="user.address" required>
            </label>
            <button type="submit">{{ mode === "create" ? "Create" : "Update" }}</button>
            <button type="button" @click="cancel">Cancel</button>
        </form>

        <p v-if="error"> {{error}}</p>
    </div>
</template>

<script>
import axios from "@/axios";

export default {
    data() {
        return {
            error: ""
        };
    },
    props: {
        user: {
            type: Object,
            default: () => ({
                id: 0,
                name: "",
                surname: "",
                email: "",
                address: "",
                date: ""
            })
        },
        mode: {
            type: String,
            default: "create"
        },
        callback: {
            type: Function,
            default: () => {}
        }
    },


    methods: {
        saveUser() {
            if (this.mode === "create") {
                this.createUser();
            } else {
                this.updateUser();
            }

        },
        cancel() {
            this.$emit("cancel");
        },
        createUser() {
            axios.post('/users', this.user)
                .then(response => {
                    this.error = "";
                    this.$emit("save", response.data);

                })
                .catch(error => {
                    this.error = error.response.data?.message;
                    console.log(error);
                });
        },
        updateUser() {
            axios.put(`/users`, this.user)
                .then(response => {
                    this.error = "";
                    this.$emit("save", response.data);
                })
                .catch(error => {
                    this.error = error.response.data?.message;
                    console.log(error);
                });
        },
    }
};
</script>
<style>
#form {
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: 0 auto;
}
</style>
