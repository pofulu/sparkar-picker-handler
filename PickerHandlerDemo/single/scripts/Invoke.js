const Reactive = require('Reactive');

/**
 *
 * @param {EventSource} eventSource
 * @param {{(any?:any):void}} call
 */
export function invokeOnce(eventSource, call) {
    const once = eventSource.subscribe(any => {
        once.unsubscribe();
        call(any);
    });

    return once;
}

/**
 *
 * @param {EventSource} eventSource
 * @param {{(any?:any):void}} call
 * @return {Promise<any>}
 */
export function invokeOnceThen(eventSource, call) {
    return new Promise(resolve => {
        invokeOnce(eventSource, i => {
            call(i);
            resolve(i);
        })
    })
}

/**
 *
 * @param {EventSource[]} eventSourceList
 * @param {{(any?:any):void}} call
 */
export function invokeOnceList(eventSourceList, call) {
    let events = [];
    eventSourceList.forEach(i => {
        events.push(i.subscribe(any => {
            call(any);
            unsubscribeAll();
        }));
    })

    function unsubscribeAll() {
        events.forEach(e => {
            e.unsubscribe();
        });
    }
}

/**
 * 
 * @param {EventSource[]} eventSourceList 
 * @param {{(any?:any):void}} call 
 */
export function subscribeList(eventSourceList, call) {
    eventSourceList.forEach(i => {
        i.subscribe(call);
    });
}

export function onSetSignal(signal, callback = () => { }) {
    return invokeOnce(signal.monitor({ 'fireOnInitialValue': true }).select('newValue'), callback);
}

export function onSetSignalThen(signal, callback = () => { }) {
    return invokeOnceThen(signal.monitor({ 'fireOnInitialValue': true }).select('newValue'), callback);
}