<template>
    <!--
    <div>
        <Town v-bind:town="towns[0]" />
        <Town v-bind:town="towns[1]" />
    </div>
    -->
    <div>
        <transition-group enter-active-class="animated bounceIn" leave-active-class="animated bounceOut">
            <Town v-for="(data, index) in towns" v-bind:key="index" :town="'# ' + data" :done="isDone[index]" />
        </transition-group>
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
            ]
        })
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h4 {
        margin: 40px 0 0;
        color: red;
    }
</style>
