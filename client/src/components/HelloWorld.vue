<template>
  <div class="my-2">
    <v-btn v-if="botStatus" large class="green" style="color: white" @click="clickButton('Здарова')">Бот работает</v-btn>
    <v-btn v-else large class="red" style="color: white" @click="clickButton('Здарова')">Бот выключен</v-btn>
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
            botStatus: {
                get() {
                    if(this.botStatus === undefined){

                    }
                }
            }
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
            check: function (data) {
                this.botStatus = data.botStatusB;
            }
        },
    }
</script>


