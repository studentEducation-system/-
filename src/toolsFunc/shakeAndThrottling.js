export default {
    throttling(callback,time){
        let timer = null;
        return function (){
            clearTimeout(timer);
            timer = setTimeout(()=>{
                callback();
            },time)
        }
    }
}