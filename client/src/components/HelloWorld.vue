<template>
  <div class="my-2" v-if="botStatus !== undefined">
    <v-btn v-if="botStatus" large class="green" style="color: white">Бот включен</v-btn>
    <v-btn v-else large class="red" style="color: white">Бот выключен</v-btn>
  </div>
</template>

<script>
    const axios = require('axios');

    export default {
        name: 'HelloWorld',
        data () {
            return {
                botStatus: undefined
            }
        },
        computed: {

        },
        methods: {
            clickButton(data) {
                this.$socket.emit('message', data)
            }
        },
        sockets: {
            connect: function () {
                console.log('socket connected')
            },
            bot_status(status) {
                this.botStatus = status;
            }
        },
    }
</script>


