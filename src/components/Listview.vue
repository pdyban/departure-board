<template>
  <b-list-group>
    <b-list-group-item v-for="item in items" :key="item.id">
      <b-container>
        <b-row>
          <b-col cols="auto" md="1">
            <b-badge variant="primary" v-bind:class="badgeType(item)" pill>{{ item.line }}</b-badge>
          </b-col>
          <b-col cols=6 md="2" auto class="text-left">
            {{ item.departureTime }}
          </b-col>
          <b-col cols="12" md="9" class="text-left">
            {{ item.endStation }}
          </b-col>
        </b-row>
      </b-container>
    </b-list-group-item>
  </b-list-group>
</template>
<script>
export default {
  data() {
      return {'items': [
        {'line': 'M10', 'type': 'tram', 'departureTime': 'in 3 mins', 'endStation': 'S+U Hauptbahnhof'},
        {'line': 'U5', 'type': 'subway', 'departureTime': 'in 5 mins', 'endStation': 'Hönow'}
        ]
      }
  },
  methods: {
    badgeType: function(item) {
      return 'badge-' + item.type;
    }
  }
}
</script>
<style>
.badge-subway {
  color: white;
  background-color: brown;
}
.badge-tram {
  color: white;
  background-color: red;
}
</style>
