<template>
  <b-list-group>
    <b-list-group-item variant="warning" v-if="expired">
      Server is down.
    </b-list-group-item>
    <b-list-group-item v-for="item in items" :key="item.id" :disabled="expired" >
      <b-container>
        <b-row>
        </b-row>
        <b-row>
          <b-col cols="auto" md="1">
            <b-badge variant="primary" v-bind:class="badgeType(item)" pill>{{ item.line }}</b-badge>
          </b-col>
          <b-col cols=6 md="2" auto class="text-left">
            {{ when(item) }}
          </b-col>
          <b-col cols="12" md="9" class="text-left">
            {{ item.direction }}
          </b-col>
        </b-row>
      </b-container>
    </b-list-group-item>
  </b-list-group>
</template>
<script>
import axios from 'axios';

var TEST = false;

export default {
  data() {
      return {
        items: [],
        lastUpdate: null,
        now: Date.now()
      }
  },
  methods: {
    badgeType: function(item) {
      return 'badge-' + item.type;
    },
    when: function(item) {
      var timeLeft = (Date.parse(item.departureTime) - Date.now())/1000/60;
      if(timeLeft < -2) {
        return "gone";
      }
      else if(timeLeft < 0) {
        return "now";
      }
      else {
        return Math.round(timeLeft, 0) + ' min';
      }
    },
    retrieveDepartures: function() {
      if(!TEST) {
        console.log('Requesting data from server...');
        axios
          .get('https://v5.bvg.transport.rest/stops/900120008/departures?results=15')
          .then(response => {this.items = parseResponse(response); this.lastUpdate=Date.now()})
        }
      else {
        console.log('Running in test mode');
        this.items = [
          {'line': 'M10', 'type': 'tram', 'departureTime': '2021-01-02T00:32:00+01:00', 'direction': 'S+U Hauptbahnhof'},
          {'line': 'U5', 'type': 'subway', 'departureTime': '2021-01-02T00:35:00+01:00', 'direction': 'Hönow'}
          ];
        this.lastUpdate = Date.now();
      }
    }
  },
  computed: {
    expired: function() {
      if (this.lastUpdate == null) return true;
      return Math.abs(Date.now() - this.lastUpdate) > 120000;
    }
  },
  created: function() {
    var self = this;
    this.retrieveDepartures();
    setInterval(this.retrieveDepartures, 30000);
    setInterval(function () {
       self.now = Date.now()
    }, 1000);
  }
}
function parseResponse(response) {
  if(response.status != 200) {
    return [];
  }
  var res = [];
  for (const item of response.data) {
    var item_res = {
      'direction': item.direction,
      'line': item.line.name,
      'type': item.line.product,
      'departureTime': item.when
    }
    res.push(item_res);
  }
  return res;
}
</script>
<style>
.badge-subway {
  color: white;
  background-color: #664019;
}
.badge-tram {
  color: white;
  background-color: red;
}
.badge-suburban {
  color: white;
  background-color: green;
}
.badge-regional {
  color: white;
  background-color: #ec0016;
}
.badge-bus {
  background-color: #9900FF;
}
</style>
