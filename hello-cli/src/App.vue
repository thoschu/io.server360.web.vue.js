<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <p>{{by}}</p>
    <p>{{year}}</p>
    <Towns v-bind:towns="towns" />
    <Test msg="Foo bar baz" />
    <hr>
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
  import HelloWorld from './components/HelloWorld.vue';
  import Towns from './components/Towns.vue';
  import Test from './components/test/Test.vue';

  export default {
    name: 'app',
    data: () => {
        return {
            by: 'by Tom S.',
            year: 2018,
            towns: ['Hamburg', 'Bielefeld', 'St. Gallen']
        }
    },
    components: {
      HelloWorld, Towns, Test
    }
  }
</script>

<style>
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
