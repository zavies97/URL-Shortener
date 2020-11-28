<template>
    <div>
        <h1 id="app">
            <label>URL Shortener</label>
        </h1>
        <div>
            Enter a URL below for it to be shortened
        </div>
        <div>
            <input type="text" id="url" name="url"/>
        </div>
        <div>
            <input type="submit" value="Submit">
        </div>
    </div>
</template>

<script>
export default {
  name: 'URLShortenerPage',
  props: {
    msg: String
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
</style>