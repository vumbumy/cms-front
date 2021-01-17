import Vue from 'vue';
const EventBus = new Vue();

export default EventBus;

export function saved() {
    EventBus.$emit('saved')
    EventBus.$emit('refresh')
}

export function refresh() {
    EventBus.$emit('refresh')
}

export function registerRefresh(method){
    EventBus.$on('refresh', method)
}
