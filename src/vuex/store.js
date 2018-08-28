import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    // 定义状态
    state: {
        type: 0,
        peopleId: '0'
    },
    state2 : {
        pageYOffset: 0
    },
    stateS : {
        pageYOffsetS: 0
    },
    detial: {
        detialMes: {}
    },
    mutations : {
        setPageYOffset(state2, val) {
          state2.pageYOffset = val;
        },
        setPageYOffsetS(stateS, val) {
            stateS.pageYOffsetS = val;
          },
        setPageDetialMes(detial, val) {
            detial.detialMes = val;
        }
    }
})

export default store