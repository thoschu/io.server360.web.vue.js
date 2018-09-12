<template>
    <section>
        <p v-show="$route.params.url">{{$route.params.url}}</p>
        <div class="wrapper">
            <div class="box">1</div>
            <div class="box">2</div>
            <div class="box">3</div>
            <div class="box">4</div>
            <div class="box">5</div>
            <div class="box">6</div>
            <div class="box">7</div>
            <div class="box">8</div>
            <div class="box">9</div>
            <div class="box">10</div>
            <div class="box">11</div>
            <div class="box">12</div>
        </div>
    </section>
</template>

<script>
    export default {
        name: 'Images'
    }
</script>

<style scoped>
    .box {
        background-color: #444;
        color: #fff;
        border-radius: 5px;
        padding: 20px;
        font-size: 150%;
    }

    .box:nth-child(even) {
        background-color: #ccc;
        color: #000;
    }

    .wrapper {
        margin: 0 auto;
        width: 600px;
        display: grid;
        grid-gap: 10px;
        grid-template-columns: repeat(6, 100px);
        grid-template-rows: 100px 100px 100px;
        grid-auto-flow: column;
    }
</style>
