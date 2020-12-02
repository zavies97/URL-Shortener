<script type = "text/javascript" src = "js/vue.js"></script>
<template>
    <div id="sendUrl">
        <h1 id="app">
            <label>URL Shortener</label>
        </h1>
        <div> 
            Enter a URL below for it to be shortened
        </div>
        <div>
            <input type="text" id="url" name="url" v-model="enteredUrl" />
        </div>
        <br>
        <input type="submit" value="Submit" @click="callPost" /> 

        <input type="submit" value="Press to see list of urls" @click="getList" />
        <br>
        <br>
        <ul>
          <li v-for="item in message" v-bind:key="item"> 
            {{ originalUrlText }} {{ item.originalUrl }} {{ middleText }} {{ shortenedUrlText }}  {{ item.shortenedUrl }}

          </li>
        </ul>
    </div>
</template>

<script>

export default {
  name: 'URLShortenerPage',
  props: {
    msg: String
  },
  el: '#sendUrl',
  data() {
    return {
      originalUrlText: 'Original Url -> "',
      middleText: '" ',
      shortenedUrlText: 'Shortened Url: -> ',
      message: [
        {
          originalUrl: 'Loading',
          shortenedUrl: 'this'
        }
      ]
    }
  },
  methods: {
    async callPost () {

      const method = "POST";
      const headers = { 
        "Content-Type": "application/json"
      };
      const body = JSON.stringify({
        originalUrl: this.enteredUrl
      });

      try {
        await fetch("http://localhost:3000/url/newurl", {
          method,
          headers,
          body,
        });

      } catch (error) {
        console.log('failed', error);
      }

      window.location.reload();

    },
    async getList() {

      console.log('started');
      const method = "GET";

      try {
        const data = await fetch("http://localhost:3000/url/geturl", {
          method
        }).then(response=>response.json()).then(returnValue=>{

          console.log(returnValue.message);
          this.message = returnValue.message;

          console.log(this.message[0].originalUrl)

          return returnValue.message;
        });

      } catch (error) {
        console.log('failed', error);
        return 'error when fetching';
      }

      console.log('ended');
    }
  }
}

</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .hide {
    visibility: hidden !important;
}
</style>