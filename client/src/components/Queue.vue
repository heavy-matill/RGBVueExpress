<template>
  <div class="queue">
    <h1>Queue here</h1>
    <li v-for="id in ids" :key="id">
      {{ id }}
    <Animation :iid="id"/>
    </li>
  </div>
</template>

<script>
import Animation from './Animation'

export default {
  name: 'Queue',
  data () {
    return {
      ids: [0, 1, 2],
      lid: 9
    }
  },
  components: {
    Animation
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
