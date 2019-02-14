<template>
  <v-app id="inspire">
    <div>
      <v-toolbar
        color="cyan"
        dark
        tabs
      >
        <!--<v-toolbar-side-icon></v-toolbar-side-icon>-->
        <v-toolbar-title>Page title</v-toolbar-title>
<!--
        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>search</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>more_vert</v-icon>
        </v-btn>-->

        <v-tabs
          slot="extension"
          v-model="tabs"
          centered
          color="cyan"
          slider-color="yellow"
        >
          <v-tab
            v-for="name in ['HelloWorld', 'Queue']"
            :key="name"
          >
          {{ name }}
          </v-tab>
        </v-tabs>
      </v-toolbar>

      <v-tabs-items v-model="tabs">
        <v-tab-item
          :key="'HelloWorld'"
        >
          <v-card flat>
            <v-card-text><hello-world/></v-card-text>
          </v-card>
        </v-tab-item>
        <v-tab-item
          :key="'Queue'"
        >
          <v-card flat>
            <v-card-text><queue/></v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </div>
  </v-app>
</template>

<script>
import HelloWorld from './Components/HelloWorld'
import Queue from './Components/Queue'
export default {
  name: 'App',
  data () {
    return {
      tabs: 1
    }
  },
  components: {
    HelloWorld,
    Queue
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
