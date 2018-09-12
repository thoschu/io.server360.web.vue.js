<template>
    <div>
        <p>{{loremipsum}}</p>
    </div>
</template>

<script>
    const axios = require('axios');

    export default {
        name: 'Info',
        data: ()=> ({
            loremipsum : `
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque at lectus iaculis, hendrerit ante ac, interdum diam. Nullam leo mi, vulputate eget massa nec, suscipit gravida nisi. Curabitur viverra ligula fermentum metus placerat, nec dictum sem imperdiet. Cras urna sapien, pellentesque sit amet mi molestie, faucibus porttitor ante. Pellentesque lacinia nisl a imperdiet vehicula. Sed vitae diam suscipit, vehicula diam placerat, vehicula lectus. Aliquam nec malesuada velit. Fusce feugiat facilisis vulputate. Cras elementum eget orci non auctor. Duis vehicula, enim in finibus porta, risus arcu ornare quam, sed iaculis dolor justo nec augue.
                Maecenas ut mauris neque. Suspendisse eget quam mauris. Cras feugiat blandit tellus sit amet dictum. Nulla facilisi. Aliquam erat volutpat. Pellentesque pharetra orci viverra viverra tempor. Etiam ante neque, ultrices ac leo sed, ultricies commodo risus. Nunc pretium odio ex, vitae rutrum turpis feugiat sed. Quisque vitae ullamcorper erat. Morbi faucibus velit at placerat ullamcorper. Aliquam iaculis rhoncus quam ut facilisis. Maecenas laoreet, eros sed sollicitudin dignissim, enim lacus posuere ante, ullamcorper tristique nisl metus sed elit. Morbi vitae massa lacus. Nullam nunc purus, mollis volutpat velit ac, cursus porta magna.
                Donec leo eros, malesuada non velit eget, iaculis rhoncus sem. Nullam venenatis, erat sed auctor interdum, mauris dolor iaculis arcu, vel dignissim velit risus sit amet mi. Suspendisse faucibus convallis lectus rhoncus tincidunt. Sed ultricies nisl elementum, scelerisque elit sit amet, imperdiet odio. Aliquam erat volutpat. In cursus mollis mattis. Suspendisse facilisis ut diam varius pretium. Aliquam eget risus sit amet felis pharetra imperdiet congue in enim. Curabitur tincidunt rutrum dictum. Aenean nec porttitor arcu. Cras posuere eget ipsum quis auctor. Suspendisse ac ante vestibulum, dictum dui eget, rutrum ipsum. Nam ac aliquam sapien. Nullam tristique nunc ut risus dictum aliquet. Sed luctus urna quis justo porta gravida.
                Sed commodo risus ac rutrum iaculis. Quisque tincidunt efficitur leo, non commodo orci sagittis eget. Etiam in dolor ut nibh scelerisque pulvinar ac quis ipsum. Fusce at hendrerit lorem. Aliquam accumsan rutrum fermentum. Donec vel turpis nec erat malesuada luctus id id arcu. Mauris faucibus blandit dolor, et congue ipsum. Sed fermentum purus ut justo gravida, sed mattis massa mattis. Ut non ultricies eros. Quisque tincidunt hendrerit dui non dapibus.
                Ut volutpat tortor id arcu gravida, id venenatis metus pellentesque. Praesent mattis eros vitae ex congue lacinia. Nam nec urna mi. Nullam vitae est ut nulla pellentesque faucibus a sed nibh. Vestibulum a dictum metus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Proin eu quam sapien. Quisque blandit diam sit amet risus ullamcorper, nec cursus est maximus. Nullam condimentum suscipit eleifend. In pellentesque nibh non elit accumsan, non auctor enim feugiat. Proin at ipsum bibendum, hendrerit erat a, finibus nunc. Ut mi leo, mattis at ipsum eu, congue porttitor libero. Aliquam in urna id sapien sodales molestie. Proin venenatis egestas ex id laoreet. In hac habitasse platea dictumst.
            `
        }),
        created() {
            axios.get('https://baconipsum.com/api/?type=meat-and-filler&paras=5&format=text')
                .then(res => {
                    this.$log.debug(res);
                    return res;
                })
                .catch((err) => {
                    this.$log.error(err);
                    return err;
                })
                .then(res => {
                    this.loremipsum = res.data ? res.data : res;
                });
        }
    }
</script>

<style scoped>
    p {
        color: darkslateblue;
    }
</style>
