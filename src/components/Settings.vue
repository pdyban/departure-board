<template>
  <b-list-group>
    <b-list-group-item>
      <b-container>
        <b-form>
          <label for="type-search">Enter station name:</label>
          <b-form-input id="type-search" type="search" v-model="query" list="suggestions" autocomplete="off" :state="stationSelected"></b-form-input>
          <datalist id="suggestions">
            <option v-for="suggestion in suggestions">{{suggestion.label}}</option>
          </datalist>

          <label for="type-threshold">Minimum time to departure:</label>
          <b-form-input id="type-threshold" type="number" v-model="threshold" autocomplete="off"></b-form-input>
        </b-form>
      </b-container>
    </b-list-group-item>
  </b-list-group>
</template>
<script>
import _ from 'lodash';
import axios from 'axios';

export default {
  data() {
        return {
          query: '',
          suggestions: [],
          stationID: null,
          stationName: '',
          threshold: -1
        }
  },
  computed : {
    stationSelected() {
      console.log('Selected station: ' + this.stationID + ': ' + this.stationName);

      for(const sug of this.suggestions) {
        if(sug.label === this.query) {
          return true;
        }
      }
      return false;
    }
  },
  methods: {
    searchStationByName: function() {
      console.log('Searching for station ' + this.query);
      axios
        .get('https://v5.bvg.transport.rest/stops?query=' + encodeURI(this.query))
        .then(response => {
          this.suggestions = parseResponse(response);
        })
        .catch(error => {
          console.log(error);
        })
    }
  },
  watch: {
    query: function(value, oldValue) {
      console.log('Old value: ' + oldValue + '; New Value: ' + value);
      for(const sug of this.suggestions) {
        if(sug.label === this.query) {
          this.stationID = sug.value;
          this.stationName = sug.label;
          console.log('Selected station ' + sug.value);
          localStorage.stationID = sug.value;
          localStorage.stationName = sug.label;
          return;
        }
      }
      this.debouncedSearchStationByName();
    },
    threshold: function(value) {
      localStorage.threshold = value;
    }
  },
  created: function() {
    this.debouncedSearchStationByName = _.debounce(this.searchStationByName, 500);

    if(localStorage.stationID) {
      this.stationID = localStorage.stationID;
      this.stationName = localStorage.stationName;
      console.log('Found station in local storage: ' + this.stationName);
      this.query = this.stationName;
    }

    if(localStorage.threshold) {
      this.threshold = localStorage.threshold;
    }
  },
  mounted: function() {
  }
}

function parseResponse(response) {
  if(response.status != 200) {
    return [];
  }
  var res = [];
  for(const station of response.data) {
    var item_res = {
      'value': station.id,
      'label': station.name
    }
    res.push(item_res);
  }
  return res;
}
</script>
<style src="vue-advanced-search/dist/AdvancedSearch.css"></style>
