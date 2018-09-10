<template>
    <!--
    <div>
        <Town v-bind:town="towns[0]" />
        <Town v-bind:town="towns[1]" />
    </div>
    -->
    <div>
        <Town v-for="(data, index) in towns" v-bind:key="index" :town="'# ' + data" :done="isDone[index]" />
    </div>
</template>

<script>
    import Town from './Town.vue';

    export default {
        name: 'Towns',
        components: {
            Town
        },
        props: {
            towns: Array
        },
        data: ()=> ({
            isDone: [
                false,
                false,
                true
            ],
            newTown: ''
        }),
        methods: {
            addTown() {
                console.log('ADD' + this.newTown);
            },
            deleteTown() {
                console.log('REMOVE');
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h4 {
        margin: 40px 0 0;
        color: red;
    }
</style>
