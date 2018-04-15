<template>
  <v-app>
    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-container fluid>
        <v-alert type="error" :value="podCount.fitOneErr">
          Do not fit one pod
        </v-alert>
        <v-form>
          <v-subheader>Investments</v-subheader>
          <v-slider :min="1" :max="1000000000" v-model="investmentsAmount"></v-slider>
          <v-text-field v-model="investmentsAmount" prefix="$" type="number" value="true"></v-text-field>
          <v-subheader>S9 %</v-subheader>
          <v-slider v-on:input="onPercentSliderChange" id="s9-slider" :min="1" :max="100"
                    v-model="minersData.S9.percent"></v-slider>
          <v-subheader>Alpha Miner %</v-subheader>
          <v-slider v-on:input="onPercentSliderChange" id="alpha-slider" :min="1" :max="100"
                    v-model="minersData.ALPHA.percent"></v-slider>
          <v-subheader>L3+ %</v-subheader>
          <v-slider v-on:input="onPercentSliderChange" id="l3-slider" :min="1" :max="100"
                    v-model="minersData.L3.percent"></v-slider>
          <v-subheader> Distributed {{minersPercentSum}}% keep it 100%</v-subheader>
          <!--<v-select label="Electricity" :items="electricity_costs" :change="electricity = "></v-select>-->
          <!--<v-subheader>Electricity costs</v-subheader>-->
          <v-text-field label="Electricity cost" v-model="electricity"></v-text-field>
        </v-form>
      </v-container>

    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon v-html="miniVariant ? 'chevron_right' : 'chevron_left'"></v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>web</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>remove</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-content>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex xs3>
            <v-list>
              <v-list-tile>
                <v-list-tile-avatar>
                  <v-icon color="indigo">schedule</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  Global Stats
                </v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>S9 amount</v-list-tile-content>
                <v-list-tile-action class="text-xs-right">{{minersData.S9.amount}}</v-list-tile-action>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>L3 amount</v-list-tile-content>
                <v-list-tile-action>{{minersData.L3.amount}}</v-list-tile-action>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Alpha amount</v-list-tile-content>
                <v-list-tile-action>{{minersData.ALPHA.amount}}</v-list-tile-action>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Total Invested</v-list-tile-content>
                <v-list-tile-action>${{ totalInvested }}</v-list-tile-action>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Total devices</v-list-tile-content>
                <v-list-tile-action>{{sumOfMiners}}</v-list-tile-action>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>BTC to USD</v-list-tile-content>
                <v-list-tile-action>${{BTC_TO_USD.toFixed(2)}}</v-list-tile-action>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>% of Pod power</v-list-tile-content>
                <v-list-tile-action>{{podCount.pod_count_power.toFixed(2)}}</v-list-tile-action>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>% of Pod space</v-list-tile-content>
                <v-list-tile-action>{{podCount.pod_count_size.toFixed(2)}}</v-list-tile-action>
              </v-list-tile>
              <v-list-tile>
                <v-list-tile-content>Month to BE</v-list-tile-content>
                <v-list-tile-action>{{monthToBE}}</v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-flex>
          <v-flex xs7
          v-for="miner in minersArrayOfIncome"
          :key="miner.id">
            <v-subheader>{{ miner.name }} Monthly Profit</v-subheader>
            <v-data-table
              :headers="revenueTableHeaders"
              :items="miner.data">
              <!--hide-actions-->

              <template slot="items" slot-scope="props">
                <td>{{ props.item.month }}</td>
                <td class="text-xs-right">{{ props.item.btc_revenue.toFixed(5) }} BTC</td>
                <td class="text-xs-right">${{ props.item.usd_revenue.toFixed(2) }} </td>
                <td class="text-xs-right">${{ props.item.expenses.toFixed(2) }} </td>
                <td class="text-xs-right">${{ props.item.balance.toFixed(2) }} </td>
              </template>
            </v-data-table>
          </v-flex>
          <!--<v-flex xs5>-->
            <!--<v-subheader>Total revenue</v-subheader>-->
            <!--<v-data-table-->
              <!--:headers="revenueTableHeaders"-->
              <!--:items="miner.data">-->
              <!--&lt;!&ndash;hide-actions&ndash;&gt;-->

              <!--<template slot="items" slot-scope="props">-->
                <!--<td>{{ props.item.month }}</td>-->
                <!--<td class="text-xs-right">{{ props.item.btc_revenue }} BTC</td>-->
                <!--<td class="text-xs-right">${{ props.item.usd_revenue }} </td>-->
                <!--<td class="text-xs-right">${{ props.item.expenses }} </td>-->
                <!--<td class="text-xs-right">${{ props.item.balance }} </td>-->
              <!--</template>-->
            <!--</v-data-table>-->
          <!--</v-flex>-->
        </v-layout>
      </v-container>
      <!--<router-view/>-->
    </v-content>

    <v-footer :fixed="fixed" app>
      <span>All calculaton data received from whattomine.com &copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
  import axios from 'axios'

  let minersAmountWatcher = function () {
    let sum = 0
    for (let item in this.minersData) {
      if (this.minersData.hasOwnProperty(item)) {
        let cur = this.minersData[item]
        cur.amount = Math.floor(this.investmentsAmount / cur.price * cur.percent / 100)
        sum += cur.amount
      }
    }
    this.$set(this, 'sumOfMiners', sum)
  }

  export default {
    data () {
      return {
        clipped: false,
        drawer: true,
        fixed: false,
        items: [{
          icon: 'bubble_chart',
          title: 'Inspire'
        }],
        miniVariant: false,
        right: true,
        rightDrawer: false,
        title: 'Mining Calc',
        investmentsAmount: 1000000,
        // percents: {
        //   S9Percent: 50,
        //   ALPHAPercent: 30,
        //   L3Percent: 20
        // },
        revenueTableHeaders: [
          {
            text: 'Month',
            value: 'month'
          },
          {
            text: 'Effic BTC',
            value: 'btc_revenue'
          },
          {
            text: 'Effic USD',
            value: 'usd_revenue'
          },
          {
            text: 'Power expenses',
            value: 'expenses'
          },
          {
            text: 'Balance USD',
            value: 'balance'
          }
        ],
        minersData: {
          S9: {
            percent: 50,
            amount: 0,
            hashrate: 14000.0, // Ghss
            power: 1500.0,
            price: 1300.0,
            btc_revenue_24: null,
            pod_limit: 980
          },
          ALPHA: {
            percent: 30,
            amount: 0,
            hashrate: 250, // Mhs
            power: 1500,
            price: 3500,
            btc_revenue_24: null,
            pod_limit: 430
          },
          L3: {
            percent: 20,
            amount: 0,
            hashrate: 504, // Mhs
            power: 880,
            price: 570,
            btc_revenue_24: null,
            pod_limit: 1100
          }
        },
        sumOfMiners: 0,
        time_last_updated: null,
        BTC_TO_USD: 0,
        electricity_costs: [
          {text: '0.045', value: 0.045},
          {text: '0.09', value: 0.09},
          {text: 'self defined', value: 'self_defined'}
        ],
        electricity: 0.09,
        MAINTENANCE_COST_PER_KW: 23.76,
        ELECTRICITY_PER_POD_LIMIT: 1600000, // 1.6 MW
        MONTH_TO_COMPUTE: 36,
        API_ENDPOINTS: {
          BTC: {
            URL: 'http://localhost:3000/btc',
            RESPONSE: null
          },
          ALPHA: {
            URL: 'http://localhost:3000/alpha',
            RESPONSE: null
          },
          L3: {
            URL: 'http://localhost:3000/l3',
            RESPONSE: null
          }
        }
      }
    },
    computed: {
      // minerAmounts: function () {
      //   return 0
      // },
      podCount: function () {
        let result = {}
        let sizePercent = 0
        let powerPercent = 0

        for (let item in this.minersData) {
          if (this.minersData.hasOwnProperty(item)) {
            sizePercent += this.minersData[item].amount / this.minersData[item].pod_limit
            powerPercent += (this.minersData[item].amount * this.minersData[item].power) / this.ELECTRICITY_PER_POD_LIMIT
          }
        }
        result.pod_count_size = sizePercent
        result.pod_count_power = powerPercent
        result.fitOneErr = false
        if (result.pod_count_power > 1 || result.pod_count_size > 1) {
          result.fitOneErr = true
        }
        return result
      },
      totalInvested: function () {
        let result = 0
        for (let item in this.minersData) {
          if (this.minersData.hasOwnProperty(item)) {
            result += this.minersData[item].amount * this.minersData[item].price
          }
        }
        return result
      },
      monthToBE: function () {
        let result = 0
        for (let month = 0; month < this.MONTH_TO_COMPUTE; month++) {
          for (let item in this.minersData) {
            if (this.minersData.hasOwnProperty(item)) {
              result += this.minersArrayOfIncome[item].data[month].balance
            }
            // console.error(result)
          }
          if (result >= this.totalInvested) {
            return month + 1
          } else {
            result = 0
          }
        }
        return null
      },
      minersPercentSum: function () {
        return this.minersData.S9.percent + this.minersData.L3.percent + this.minersData.ALPHA.percent
      },
      minersArrayOfIncome: function () {
        let result = {}
        for (let item in this.minersData) {
          if (this.minersData.hasOwnProperty(item)) {
            if (!result.total) {
              result.total = {
                data: [],
                name: 'Total'
              }
            }
            result[item] = {}
            result[item].data = []
            result[item].name = item
            let cur = this.minersData[item]
            for (let month = 0; month < this.MONTH_TO_COMPUTE; month++) {
              let revenue = cur.amount * cur.btc_revenue_24 * 31
              let usdRevenue = (revenue * this.BTC_TO_USD * (month + 1)).toFixed(2)
              let expenses = (cur.power * this.electricity * 24 * 30 * (month + 1) / 1000).toFixed(2)
              let balance = (usdRevenue - expenses).toFixed(2)
              result[item].data[month] = {
                month: month + 1,
                btc_revenue: parseFloat((revenue * (month + 1)).toFixed(5)),
                usd_revenue: parseFloat(usdRevenue),
                expenses: parseFloat(expenses),
                balance: parseFloat(balance)
              }
              if (result.total.data[month]) {
                result.total.data[month].btc_revenue += parseFloat((revenue * (month + 1)).toFixed(5))
                result.total.data[month].usd_revenue += parseFloat(usdRevenue)
                result.total.data[month].expenses += parseFloat(expenses)
                result.total.data[month].balance += parseFloat(balance)
              } else {
                result.total.data[month] = {
                  month: month + 1,
                  btc_revenue: parseFloat((revenue * (month + 1)).toFixed(5)),
                  usd_revenue: parseFloat(usdRevenue),
                  expenses: parseFloat(expenses),
                  balance: parseFloat(balance)
                }
              }
            }
          }
        }
        return result
      }
    },
    name: 'App',
    watch: {
      minersData: {
        handler: minersAmountWatcher,
        deep: true
      },
      investmentsAmount: {
        handler: minersAmountWatcher,
        deep: true
      }
      // 'percents.S9Percent': function () {// TODO MAKE NORMAL SUM
      //   if (this.percents.S9Percent + this.percents.ALPHAPercent + this.percents.L3Percent !== 100) {
      //     this.percents.L3Percent--
      //   }
      // }
    },
    methods: {
      onPercentSliderChange (input) {
        // debugger
        return input
      },
      getBTC_Revenue: function () {
        // let url = this.API_ENDPOINTS.ASIC
        axios.get(this.API_ENDPOINTS.BTC.URL)
          .then(response => {
            this.API_ENDPOINTS.BTC.RESPONSE = response.data
            this.minersData.S9.btc_revenue_24 = this.API_ENDPOINTS.BTC.RESPONSE.btc_revenue
            this.BTC_TO_USD = this.API_ENDPOINTS.BTC.RESPONSE.exchange_rate3
          }).catch(error => {
            // debugger
            return error
          })
        axios.get(this.API_ENDPOINTS.ALPHA.URL)
          .then(response => {
            this.API_ENDPOINTS.ALPHA.RESPONSE = response.data
            this.minersData.ALPHA.btc_revenue_24 = this.API_ENDPOINTS.ALPHA.RESPONSE.btc_revenue
          }).catch(error => {
            // debugger
            return error
          })
        axios.get(this.API_ENDPOINTS.L3.URL)
          .then(response => {
            this.API_ENDPOINTS.L3.RESPONSE = response.data
            this.minersData.L3.btc_revenue_24 = this.API_ENDPOINTS.L3.RESPONSE.btc_revenue
          }).catch(error => {
            // debugger
            return error
          })
        return 0
      }
    },
    created () {
      this.getBTC_Revenue()
    }
  }
</script>
