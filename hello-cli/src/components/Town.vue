<template>
  <div @click="onClickTown">
    <h4 :style="{'text-decoration': wasFinished ? 'underline overline' : 'none'}" :class="{'is-done': !wasFinished}">{{ town + ' ' + 'Done: ' + (wasFinished ? 'YES' : 'NO') }}</h4>
  </div>
</template>

<script>
    export default {
        name: 'Town',
        props: {
            town: String,
            done: Boolean
        },
        data: () => ({
          wasFinished: false
        }),
        methods: {
            onClickTown() {
                this.wasFinished = !this.wasFinished;
            }
        },
        created() {
            this.wasFinished = this.done;
        }
    }
</script>

<style scoped>
  h4 {
    color: green;
  }

  .is-done {
    color: red;
  }
</style>