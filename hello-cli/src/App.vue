<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <p>{{by}}</p>
        <p>{{year}}</p>
        <!-- form start -->
        <form @submit.prevent="addTown">
            <label for="new-town"> New Town:</label>
            <input id="new-town" v-validate="'required|alpha|min:3'" name="alpha_field" type="text" value="Berlin" v-model="newTown">
            <transition enter-active-class="animated jackInTheBox">
                <p :style="{'color': errors.has('alpha_field') ? 'red' : 'green'}" v-show="errors.has('alpha_field')">
                    {{errors.first('alpha_field')}}
                </p>
            </transition>
            <br>
            <input type="submit" value="Submit">
        </form>
        <button @click="deleteLastTown">Remove last town</button>
        <!-- form end -->
        <Towns v-bind:towns="towns"/>
        <Test msg="Foo bar baz"/>
        <hr>
        <HelloWorld msg="Welcome to Your Vue.js App"/>
        <hr>
        <ul>
            <li>
                <router-link to="/info">INFO</router-link>
            </li>
             <li>
                 <router-link to="/images">IMAGES</router-link>
             </li>
        </ul>
        <transition enter-active-class="animated flipInX">
            <router-view></router-view>
        </transition>
        <!--<Info />-->
    </div>
</template>
<script>
    import HelloWorld from './components/HelloWorld.vue';
    import Towns from './components/Towns.vue';
    import Test from './components/test/Test.vue';
    import Info from './components/Info';

    export default {
        name: 'app',
        components: {
            HelloWorld, Towns, Test, Info
        },
        data: () => {
            return {
                by: '',
                year: 2018,
                towns: undefined,
                newTown: ''
            }
        },
        methods: {
            addTown() {
                this.$validator.validateAll()
                    .then(res => {
                        if(res)
                            this.towns.push(this.newTown);
                        this.newTown = '';
                    })
                    .catch(err => this.$log.error(err));
            },
            deleteLastTown(/*index*/) {
                // delete this.towns[index];
                this.towns.pop();
            }
        },
        created() {
            const graphQlPromise = (fqhn, query) => {
                return fetch(fqhn, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        query
                    })
                })
                .then(r => r.json())
                .then(r => r.data)
                .catch(err => {
                    this.$log.error(err);
                });
            };

            const query = `
                {
                    me {
                        towns

                        departments {
                            kind(index: 1)
                        }
                    }

                    hello
                }
            `;

            graphQlPromise('http://localhost:4000/graphql', query).then(r => {
                this.$log.debug(r.me.departments.kind);
                this.by = r.hello;
                this.towns = r.me.towns
            });
        }
    }
</script>
<style>
    @import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css');
    
    #app {
        @import url('https://fonts.googleapis.com/css?family=Montserrat');

        font-family: 'Montserrat', 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
